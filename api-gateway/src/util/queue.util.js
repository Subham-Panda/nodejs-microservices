const amqp = require('amqplib');
const { v4: uuidv4 } = require('uuid');

const config = require('../config');
const logger = require('../logger/logger');
const sendCustomResponse = require('../util/sendCustomResponse.util');
const getServiceName = require('../util/getServiceName.util');

const connectRabbitMQ = async () => {
    try {
        const connection = await amqp.connect(config.RABBITMQ_URL);
        logger.info(`[AMQP] Connected to RabbitMQ at ${config.RABBITMQ_URL}`);
        return connection;
    } catch (error) {
        logger.error(`[AMQP] Connection to RabbitMQ failed: ${error.message}`);
    }
};

const sendMessageToQueue = async (res, queueName, queueOptions, consumeOptions, message) => {
    const connection = await connectRabbitMQ();
    if (connection) {
        const channel = await connection.createChannel();
        await channel.assertQueue(queueName, queueOptions);
        const assertQueue = await channel.assertQueue('', { exclusive: true });
        const correlationId = uuidv4();
        await channel.sendToQueue(queueName, Buffer.from(message ? JSON.stringify(message) : ''), { replyTo: assertQueue.queue, correlationId });
        channel.consume(assertQueue.queue, async (consumeMessage) => {
            if (consumeMessage.properties.correlationId === correlationId) {
                const responseMessageContent = JSON.parse(consumeMessage.content.toString());
                const serviceName = getServiceName(queueName);
                sendCustomResponse(res, 201, responseMessageContent, serviceName);
            }
        }, consumeOptions);
    }
};

module.exports = {
    connectRabbitMQ,
    sendMessageToQueue,
};
