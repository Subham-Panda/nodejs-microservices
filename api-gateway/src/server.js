const config = require('./config');
const logger = require('./logger/logger');
const { connectRabbitMQ } = require('./util/queue.util');

// uncaught exception dealer
process.on('uncaughtException', (err) => {
    logger.error('UNCAUGHT EXCPETION!💥 NODE NOT EXITING...');
    logger.error(err);

    // process.exit(1);
});

const app = require('./app');

// Start the SERVER
const port = config.PORT;
const server = app.listen(port, async () => {
    logger.info(`App running on port ${port}...`);
    await connectRabbitMQ();
});

// Global unhandled rejection dealer
process.on('unhandledRejection', (err) => {
    logger.error('UNHANDLED REJECTION!💥 NODE NOT EXITING...');
    logger.error(err);

    // server.close(() => {
    //     process.exit(1);
    // });
});
