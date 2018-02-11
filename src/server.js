import http from 'http';

import app from './app';

/**
 * Normalize a port into a number, string, or false.
 * @param {string} val - The port in string form
 * @returns {Number | boolean} - The port in Number form if allowed or false
 */
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (Number.isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 * @param {Object} error - The object containing the error
 * @param {Number} port - The port to listen to
 */
function onError(error, port) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
    case 'EACCES':
        console.log(`${bind} requires elevated privileges`);
        process.exit(1);
        break;
    case 'EADDRINUSE':
        console.log(`${bind} is already in use`);
        process.exit(1);
        break;
    default:
        throw error;
    }
}

/**
 * Event listener for HTTP server "listening" event.
 * @param {Object} server - The server object used for http connections
 */
function onListening(server) {
    const addr = server.address();
    const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
    console.log(`Http server listening on ${bind}`);
}

/**
 * Creates an http server
 * @param {Number} httpPort - The port for http
 */
function createHttpServer(httpPort = 3000) {
    const port = normalizePort(process.env.HTTP_PORT || httpPort);
    const server = http.createServer(app);

    app.set('port', port);

    server.listen(port);
    server.on('error', onError.bind(null, port));
    server.on('listening', onListening.bind(null, server));
}

createHttpServer();
