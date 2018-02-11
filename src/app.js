import express from 'express';
import logger from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import cors from 'cors';
import helmet from 'helmet';

import './dal/config/db';
import './dal/models/user';

import auth from './api/routes/auth';
import podcasts from './api/routes/podcast';

const app = express();

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());

app.use('/api/auth', auth);
app.use('/api/podcasts', podcasts);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use((err, req, res) => {
        if (err.name === 'UnauthorizedError') {
            res.status(401).send({ error: err });
        } else {
            res.status(err.status || 500);
        }
    });
}

// production error handler
// no stacktraces leaked to user
app.use((err, req, res) => {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send({ error: err });
    } else {
        res.status(err.status || 500);
    }
});

module.exports = app;
