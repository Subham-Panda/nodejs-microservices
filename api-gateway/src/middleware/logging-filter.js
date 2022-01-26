const { StatusCodes } = require('http-status-codes');

const logger = require('../logger/logger');

const loggingFilter = (req, res, next) => {
    res.on('finish', () => {
        const duration = new Date().getTime() - req.requestTime.getTime();
        const userAgent = req.get('User-Agent');
        const logContext = `${userAgent} | ${req.method} | ${req.originalUrl} | ${res.statusCode} | ${duration} ms`;

        if (res.statusCode === StatusCodes.OK
            || res.statusCode === StatusCodes.CREATED
            || res.statusCode === StatusCodes.NOT_MODIFIED) {
            logger.info(logContext);
        } else {
            logger.error(logContext);
        }
    });
    next();
};

module.exports = loggingFilter;
