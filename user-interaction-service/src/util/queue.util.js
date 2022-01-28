const amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid');

const config = require('../config');
const logger = require('../logger/logger');
const Queues = require('../enum/queues');
const interactionService = require('../service/interaction.service');

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(config.RABBITMQ_URL);
        logger.info(`[AMQP] Connected to RabbitMQ at ${config.RABBITMQ_URL}`);
        return connection;
    } catch (error) {
        logger.error(`[AMQP] Connection to RabbitMQ failed: ${error.message}`);
    }
};

const consumeFromQueueAndReply= async (queue, queueOptions, consumeOptions, consumerService) => {
    try {

        const connection = await connectRabbitMQ();
        const channel = await connection.createChannel();
        await channel.assertQueue(queue, queueOptions);
        channel.prefetch(1);

        channel.consume(queue, async (consumeMessage) => {

            if (consumeMessage && consumeMessage.content && consumeMessage.content.length > 0) {

                try {

                    // verify user
                    channel.assertQueue(Queues.USER_VERIFY, queueOptions);
                    const assertQueue = await channel.assertQueue('', { exclusive: true });
                    const correlationId = uuidv4();
                    await channel.sendToQueue(Queues.USER_VERIFY, Buffer.from(consumeMessage.content.toString()), { replyTo: assertQueue.queue, correlationId });

                    channel.consume(assertQueue.queue, async (verifyMessage) => {
                        if (verifyMessage && verifyMessage.properties.correlationId === correlationId) {
                            const responseMessageContent = JSON.parse(verifyMessage.content.toString());
                            if (responseMessageContent.exists) {
                                const response = await consumerService(JSON.parse(consumeMessage.content.toString()));
                                channel.sendToQueue(consumeMessage.properties.replyTo, Buffer.from(JSON.stringify(response)), { correlationId: consumeMessage.properties.correlationId });
                            } else {
                                channel.sendToQueue(consumeMessage.properties.replyTo, Buffer.from(JSON.stringify({ message: "User doesnt exist"})), { correlationId: consumeMessage.properties.correlationId });
                            }
                        }
                        channel.ack(verifyMessage);
                    }, {})
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

const consumeFromQueue = async (queue, queueOptions, consumeOptions, consumerService) => {
    const connection = await connectRabbitMQ();
    const channel = await connection.createChannel();
    await channel.assertQueue(queue, queueOptions);
    channel.prefetch(1);

    channel.consume(queue, async (consumeMessage) => {
        if (consumeMessage && consumeMessage.content && consumeMessage.content.length > 0) {

            try {
                await consumerService(JSON.parse(consumeMessage.content.toString()));
            }
            catch (error) {
                logger.error(`[AMQP] consume error: ${error}`);
            }
        }
    }, consumeOptions)
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

        await consumeFromQueueAndReply(Queues.INTERACTION_READ, { durable: true }, { noAck: false }, interactionService.readContent);
        await consumeFromQueueAndReply(Queues.INTERACTION_LIKE, { durable: true }, { noAck: false }, interactionService.likeContent);
        await consumeFromQueueAndReply(Queues.INTERACTION_UNLIKE, { durable: true }, { noAck: false }, interactionService.unlikeContent);
        await consumeFromQueue(Queues.INTERACTION_CREATE, { durable: true }, { noAck: true }, interactionService.createInteraction);

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