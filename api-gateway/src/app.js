const express = require('express');
const cors = require('cors');

const requestTime = require('./middleware/request-time');
const loggingFilter = require('./middleware/logging-filter');
const AppError = require('./util/AppError');
const globalErrorHandler = require('./controller/error.controller');

const apiRouter = require('./router');

const app = express();

// initialize middlewares
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: false, limit: '10mb' }));

// set request time
app.use(requestTime);
// set request logger
app.use(loggingFilter);

// initialize app routers
app.use('/api', apiRouter);

app.all('*', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
