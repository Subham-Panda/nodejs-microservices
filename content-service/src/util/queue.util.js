const amqp = require('amqplib');
const config = require('../config');
const logger = require('../logger/logger');
const Queues = require('../enum/queues');
const contentService = require('../service/content.service');

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(config.RABBITMQ_URL);
        logger.info(`[AMQP] Connected to RabbitMQ at ${config.RABBITMQ_URL}`);
        return connection;
    } catch (error) {
        logger.error(`[AMQP] Connection to RabbitMQ failed: ${error.message}`);
    }
};

const consumeFromQueue = async (queue, queueOptions, consumeOptions, consumerService) => {
    try {

        const connection = await connectRabbitMQ();
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, queueOptions);
        channel.prefetch(1);

        await channel.consume(queue, async (consumeMessage) => {
            
            if (consumeMessage && consumeMessage.content && consumeMessage.content.length > 0) {

                try {
                    const response = await consumerService(JSON.parse(consumeMessage.content.toString()));
                    channel.sendToQueue(consumeMessage.properties.replyTo, Buffer.from(JSON.stringify(response)), { correlationId: consumeMessage.properties.correlationId });
                } catch (error) {
                    channel.sendToQueue(consumeMessage.properties.replyTo, Buffer.from(JSON.stringify({error})), { correlationId: consumeMessage.properties.correlationId });
                }

                channel.ack(consumeMessage);

            } else {

                channel.sendToQueue(consumeMessage.properties.replyTo, Buffer.from(JSON.stringify({ error: 'No message received' })), { correlationId: consumeMessage.properties.correlationId });

                channel.ack(consumeMessage);

            }
        }, consumeOptions)
        
    } catch (error) {
        logger.error(`[AMQP] consume error: ${error}`);
    }
}

const sendToQueue = async (queue, queueOptions, publishOptions, message) => {

    try {

        const connection = await connectRabbitMQ();
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, queueOptions);
        channel.sendToQueue(queue, Buffer.from(message ? JSON.stringify(message) : ''), publishOptions);

    } catch (error) {

        logger.error(`[AMQP] sendToQueue error: ${error}`);

    }
}

const initializeQueues = async () => {

    try {

        const connection = await connectRabbitMQ();
        const channel = await connection.createChannel();

        await consumeFromQueue(Queues.CONTENT_CREATE, { durable: true }, { noAck: false }, contentService.createContent);
        await consumeFromQueue(Queues.CONTENT_READ, { durable: true }, { noAck: false }, contentService.getContent);
        await consumeFromQueue(Queues.CONTENT_UPDATE, { durable: true }, { noAck: false }, contentService.updateContent);
        await consumeFromQueue(Queues.CONTENT_DELETE, { durable: true }, { noAck: false }, contentService.deleteContent);
        await consumeFromQueue(Queues.CONTENT_NEW, { durable: true }, { noAck: false }, contentService.getNewContent);


        channel.prefetch(1);

    } catch (error) {

        logger.error(`[AMQP] initializeQueues error: ${error}`);

    }

}

module.exports = {
    connectRabbitMQ,
    consumeFromQueue,
    sendToQueue,
    initializeQueues
}