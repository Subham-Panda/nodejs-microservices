/* eslint-disable no-param-reassign */
const AppError = require('../util/AppError');
const logger = require('../logger/logger');

const sendErrorDev = (err, req, res) => {
    // API
    return res.status(err.statusCode).json({
        status: err.status,
        error: err,
        message: err.message,
        stack: err.stack,
    });
};

const sendErrorProd = (err, req, res) => {
    // API
    if (req.originalUrl.startsWith('/api')) {
    // Operational Error, trusted error: send message to client
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        }

        // Programming or other unknown error: dont leak error details
        // 1) Log error
        logger.error('ERROR:::', err);

        // 2) Send generic message
        return res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!',
        });
    }

    // RENDERED WEBSITE
    if (err.isOperational) {
        return res.status(err.statusCode).render('error', {
            title: 'Something went Wrong',
            msg: err.message,
        });
    }

    // Programming or other unknown error: dont leak error details
    // 1) Log error
    logger.error('ERROR:::', err.message);
    // 2) Send generic message
    return res.status(err.statusCode).render('error', {
        title: 'Something went Wrong',
        msg: 'Please try again later!!',
    });
};

// eslint-disable-next-line no-unused-vars
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res);
    } else if (process.env.NODE_ENV === 'production') {
        let error = { ...err };
        error.message = err.message;
        sendErrorProd(error, req, res);
    }
};
