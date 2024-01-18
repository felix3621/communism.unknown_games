const http = require('http');
const WebSocket = require('ws');
const url = require('url');
const logger = require('./modules/logger.cjs');
const processHandler = require('./modules/processErrorHandler.cjs');

const port = 3001;

const party = require('./socket/party.cjs');

// Create an HTTP server
const httpServer = http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('WebSocket server is running.');
});

httpServer.on('upgrade', (request, socket, head) => {
    path = url.parse(request.url).pathname

    if (path == "/socket/party") {
        party.wss.handleUpgrade(request, socket, head, (socket) => {
            party.wss.emit('connection', socket, request);
        });
    } else {
        socket.destroy();
    }
});

// Listen on specified port
httpServer.listen(port, () => {
    logger.info(`Server started on port ${port}`,"socket");
});

processHandler(process, "socket")