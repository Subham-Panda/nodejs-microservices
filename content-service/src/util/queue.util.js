const amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid');

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

const consumeFromQueueAndReply = async (queue, queueOptions, consumeOptions, consumerService) => {
    try {

        const connection = await connectRabbitMQ();
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, queueOptions);
        channel.prefetch(1);

        await channel.consume(queue, async (consumeMessage) => {

            if (consumeMessage && consumeMessage.content && consumeMessage.content.length > 0) {

                try {

                    if (queue === Queues.CONTENT_TOP) {

                        channel.assertQueue(Queues.INTERACTION_TOP_CONTENTS, queueOptions);
                        const assertQueue = await channel.assertQueue('', { exclusive: true });
                        const correlationId = uuidv4();
                        await channel.sendToQueue(Queues.INTERACTION_TOP_CONTENTS, Buffer.from(consumeMessage.content.toString()), { replyTo: assertQueue.queue, correlationId });

                        channel.consume(assertQueue.queue, async (topContentsResponse) => {
                            if (topContentsResponse && topContentsResponse.properties.correlationId === correlationId) {

                                const response = await consumerService(JSON.parse(topContentsResponse.content.toString()));
                                console.log("RESPONSE: ", response);
                                channel.sendToQueue(consumeMessage.properties.replyTo, Buffer.from(JSON.stringify(response)), { correlationId: consumeMessage.properties.correlationId });
                            }
                            channel.ack(topContentsResponse);
                        }, {})

                    } else {

                        const response = await consumerService(JSON.parse(consumeMessage.content.toString()));

                        if (queue === Queues.CONTENT_CREATE) {
                            channel.sendToQueue(Queues.INTERACTION_CREATE, Buffer.from(JSON.stringify({ content: response })));
                        }
    
                        channel.sendToQueue(consumeMessage.properties.replyTo, Buffer.from(JSON.stringify(response)), { correlationId: consumeMessage.properties.correlationId });

                    }

                } catch (error) {
                    channel.sendToQueue(consumeMessage.properties.replyTo, Buffer.from(JSON.stringify({ error })), { correlationId: consumeMessage.properties.correlationId });
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

        await consumeFromQueueAndReply(Queues.CONTENT_CREATE, { durable: true }, { noAck: false }, contentService.createContent);
        await consumeFromQueueAndReply(Queues.CONTENT_READ, { durable: true }, { noAck: false }, contentService.getContent);
        await consumeFromQueueAndReply(Queues.CONTENT_UPDATE, { durable: true }, { noAck: false }, contentService.updateContent);
        await consumeFromQueueAndReply(Queues.CONTENT_DELETE, { durable: true }, { noAck: false }, contentService.deleteContent);
        await consumeFromQueueAndReply(Queues.CONTENT_NEW, { durable: true }, { noAck: false }, contentService.getNewContent);
        await consumeFromQueueAndReply(Queues.CONTENT_TOP, { durable: true }, { noAck: false }, contentService.getTopContent);


        channel.prefetch(1);

    } catch (error) {

        logger.error(`[AMQP] initializeQueues error: ${error}`);

    }

}

module.exports = {
    connectRabbitMQ,
    consumeFromQueueAndReply,
    sendToQueue,
    initializeQueues
}