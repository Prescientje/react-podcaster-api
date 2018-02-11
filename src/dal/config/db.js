import mongoose from 'mongoose';
import readLine from 'readline';

import { DATABASE } from './config';

const dbUri = DATABASE;
mongoose.connect(dbUri);

/*  Emulateing disconnection events on Windows */

if (process.platform === 'win32') {
    const rl = readLine.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.on('SIGINT', () => {
        process.emit('SIGINT');
    });
}

/*  CONNECTION EVENTS
    Monirtoring for successful connection through Mongoose
*/
mongoose.connection.on('connected', () => {
    console.log(`Mongoose connected to ${dbUri}`);
});

/*  Checking for connection error */
mongoose.connection.on('error', (err) => {
    console.log(`Mongoose connection error ${err}`);
});

/*  Checking for disconnection event */
mongoose.connection.on('disconnected', () => {
    console.log('Mongoose is disconnected');
});

/*  CAPTURE APP TERMINATION / RESTART EVENTS */
const gracefulShutdown = (msg, callback) => {
    mongoose.connection.close(() => {
        console.log(`Mongoose disconnection through ${msg}`);
        callback();
    });
};

/*  For app termination */
process.on('SIGINT', () => {
    gracefulShutdown('app termination', () => {
        process.exit(0);
    });
});

/*  Listens for SIGUSR2, which is what nodemon uses when it restarts app */
process.once('SIGUSR2', () => {
    gracefulShutdown('nodemon restart', () => {
        process.exit();
    });
});

/* For Heroku app termination */
process.on('SIGTERM', () => {
    gracefulShutdown('App termination', () => {
        process.exit(0);
    });
});
