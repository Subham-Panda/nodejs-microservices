const mongoose = require('mongoose');
const config = require('../config');
const logger = require('../logger/logger');

const connectDatabase = async () => {
    const dbURI = config.MONGO_URL;
    logger.info(`[MongoDB] connecting to ${dbURI}`);
    try {
        await mongoose.connect(dbURI,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        logger.info(`[MongoDB] connected to ${dbURI}`);
    } catch (error) {
        logger.error(`[MongoDB] connection error: ${error}`);
        process.exit(1);
    }

}

module.exports = connectDatabase;
