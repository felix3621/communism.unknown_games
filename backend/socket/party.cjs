const WebSocket = require('ws');
const auth = require('../modules/authentication.cjs');
const db = require('../modules/database.cjs');
const fr = require('../modules/fileReader.cjs');
const logger = require('../modules/logger.cjs');

var users = new Array();

// Create a WebSocket server and attach it to the HTTP server
const webSocketServer = new WebSocket.Server({ noServer: true });

//authenticate cookies
async function authenticate(cookies) {
    var cookie = cookies
        .split(';')
            .map(cookie => cookie.trim())
                .find(cookie => cookie.startsWith('userToken=')
                )
    if (cookie) {
        cookie = cookie.replace(/^userToken=/, '');
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

function ping() {
    setTimeout(() => {
        webSocketServer.clients.forEach((client) => {
            if (client.readyState === WebSocket.OPEN) {
                client.send(JSON.stringify({ping: "keep alive"}));
            }
        });
        ping()
    }, 500);
}
ping()

// Handle WebSocket connections
webSocketServer.on('connection', async(socket, request) => {
    let username = await authorizeSocket(socket, request);
    if (!username) return;

    let dbuser = await (await db).collection("accounts").findOne({username: username});

    sysUser = users.find(user => user.user.username == dbuser.username)

    if (sysUser)
        sysUser.socket.close(1008, "another instance")

    users.push({user: dbuser, socket: socket})

    socket.on('message', (msg) => {
        var msg = JSON.parse(msg);
    });

    //handle disconnects
    socket.on('close', (id) => {
        users.splice(users.indexOf(elem => elem.user.username == username),1)
    });
});

module.exports = {
    wss: webSocketServer
};