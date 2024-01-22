const WebSocket = require('ws');
const url = require('url');
const auth = require('../modules/authentication.cjs');
const db = require('../modules/database.cjs');

const parties = require('./party/parties.cjs');

const TPS = 10;
const disconnectTimeout = 30 * TPS;

var users = new Array();

// Create a WebSocket server and attach it to the HTTP server
const webSocketServer = new WebSocket.Server({ noServer: true });

//authenticate cookies
async function authenticate(cookies) {
    var cookie = cookies
        .split(';')
            .map(cookie => cookie.trim())
                .find(cookie => cookie.startsWith('UG_userToken=')
                )
    if (cookie) {
        cookie = cookie.replace(/^UG_userToken=/, '');
    } else {
        return null
    }


    let token = JSON.parse(auth.decrypt(decodeURIComponent(cookie)))
    let username = auth.decrypt(token[0])
    let password = auth.decrypt(token[1])

    let result = await (await db).collection("accounts").findOne({username: username, password: password})
    if (result) {
        return username
    }
    return null;
}

async function authorizeSocket(socket, request) {
    let cookie = request.headers.cookie
    let username
    if (cookie) {
        username = await authenticate(cookie)
    } 
    if (!username) {
        socket.close(1008, 'Authentication failed');
        return false;
    }
    return username
}

setInterval(() => {
    webSocketServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify({ping: "keep alive"}));
        }
    });

    for (let i = 0; i < users.length; i++) {
        if (users[i].socket) {
            users[i].disconnectTimeout = disconnectTimeout
        } else {
            users[i].disconnectTimeout--;

            if (users[i].disconnectTimeout <= 0) {
                parties.removePlayer(users[i].username);
                users.splice(i,1);
                i--;
            }
        }
    }

    parties.Tick()
}, 1000/TPS);

function connectParty(username, socket, address) {
    if (address.startsWith("/socket/party/private")) {
        parties.createParty(username, socket);
    } else if (address.startsWith("/socket/party/code")) {
        address = address.split("/");
        address = address.splice(address.indexOf("code")+1);
        address = address.join("/");

        let result = parties.joinParty(address, username, socket);

        if (!result) {
            socket.close(3001,"Game not found");
        }
    } else {
        parties.quickParty(username, socket);
    }
}

// Handle WebSocket connections
webSocketServer.on('connection', async(socket, request) => {
    let username = await authorizeSocket(socket, request);
    if (!username) return;

    let addr = url.parse(request.url).pathname;

    let usr = users.find(elem => elem.user.username == username);

    if (usr) {
        if (usr.socket) {
            usr.socket.close(1008, "another instance");
        }

        usr.socket = socket;

        if (addr != usr.addr) {
            parties.removePlayer(username);

            connectParty(username, socket, addr);
        } else {
            parties.UpdateSocket(username, socket);
        }

    } else {
        let dbuser = await (await db).collection("accounts").findOne({username: username});

        delete dbuser.password;
        delete dbuser._id;

        users.push({user: dbuser, socket: socket, disconnectTimeout: disconnectTimeout, addr: addr})

        connectParty(username, socket, addr);
    }

    socket.on('message', (msg) => {
        var msg = JSON.parse(msg);

        if (msg.socket == "close") {
            parties.removePlayer(username);
            socket.close(3000, "closed by client");
            users.splice(users.indexOf(elem => elem.user.username == username));
        }
    });

    //handle disconnects
    socket.on('close', (id) => {
        if (id != 3000)
            users.find(elem => elem.user.username == username).socket = null;
    });
});

module.exports = {
    wss: webSocketServer
};