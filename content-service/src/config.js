const dotenv = require('dotenv');

const logger = require('./logger/logger');

dotenv.config({path: '../env'});

const config = {
    NODE_ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 4000,
    RABBITMQ_URL: process.env.RABBITMQ_URL || 'amqp://localhost:5672',
    MONGO_URL: process.env.MONGO_URL || 'mongodb://localhost:27017/contentService',
};

logger.info(`NODE_ENV: ${config.NODE_ENV}`);
logger.info(`PORT: ${config.PORT}`);
logger.info(`RABBITMQ_URL: ${config.RABBITMQ_URL}`);
logger.info(`MONGO_URL: ${config.MONGO_URL}`);
logger.info('[Config] loaded.');

module.exports = config;
