const Queues = require('../enum/queues');
const Services = require('../enum/services');
const catchAsync = require('../util/catchAsync');
const QueueUtil = require('../util/QueueUtil');
const sendCustomResponse = require('../util/sendCustomResponse');

const serviceName = Services.INTERACTION_SERVICE;

exports.likeInteraction = catchAsync(async (req, res, next) => {
    const { content_id } = req.body;

    const responseMessageContent = await QueueUtil.sendMessageToQueue(
        Queues.INTERACTION_LIKE, {}, {}, { content_id },
    );

    sendCustomResponse(res, 202, responseMessageContent, serviceName);

    next();
});

exports.unlikeInteraction = catchAsync(async (req, res, next) => {
    const { content_id } = req.body;

    const responseMessageContent = await QueueUtil.sendMessageToQueue(
        Queues.INTERACTION_UNLIKE, {}, {}, { content_id },
    );

    sendCustomResponse(res, 202, responseMessageContent, serviceName);

    next();
});

exports.readInteraction = catchAsync(async (req, res, next) => {
    const { content_id } = req.body;

    const responseMessageContent = await QueueUtil.sendMessageToQueue(
        Queues.INTERACTION_READ, {}, {}, { content_id },
    );

    sendCustomResponse(res, 202, responseMessageContent, serviceName);

    next();
});
