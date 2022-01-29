const config = require('./config');
const logger = require('./logger/logger');
const connectDatabase = require('./db/db');
const { connectRabbitMQ, initializeQueues } = require('./util/queue.util');

// uncaught exception dealer
process.on('uncaughtException', (err) => {
    logger.error('UNCAUGHT EXCPETION!💥 Shutting down...');
    logger.error(err);

    process.exit(1);
});

const app = require('./app');

// Start the SERVER
const port = config.PORT;
const server = app.listen(port, async () => {
    logger.info(`App running on port ${port}...`);

    await initializeQueues();

    await connectDatabase();
});

// Global unhandled rejection dealer
process.on('unhandledRejection', (err) => {
    logger.error('UNHANDLED REJECTION!💥 Shutting down...');
    logger.error(err);

    server.close(() => {
        process.exit(1);
    });
});
