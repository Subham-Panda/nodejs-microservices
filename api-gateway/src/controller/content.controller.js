const Queues = require('../enum/queues');
const Services = require('../enum/services');
const catchAsync = require('../util/catchAsync');
const QueueUtil = require('../util/QueueUtil');
const sendCustomResponse = require('../util/sendCustomResponse');

const serviceName = Services.CONTENT_SERVICE;

exports.getContent = catchAsync(async (req, res, next) => {
    const { filter } = req.body;

    const responseMessageContent = await QueueUtil.sendMessageToQueue(
        Queues.CONTENT_READ, {}, {}, { filter },
    );

    sendCustomResponse(res, 200, responseMessageContent, serviceName);

    next();
});

exports.createContent = catchAsync(async (req, res, next) => {
    const { title, story } = req.body;

    const responseMessageContent = await QueueUtil.sendMessageToQueue(
        Queues.CONTENT_CREATE, {}, {}, { title, story },
    );

    sendCustomResponse(res, 201, responseMessageContent, serviceName);

    next();
});

exports.updateContent = catchAsync(async (req, res, next) => {
    const { filter, update } = req.body;

    const responseMessageContent = await QueueUtil.sendMessageToQueue(
        Queues.CONTENT_UPDATE, {}, {}, { filter, update },
    );

    sendCustomResponse(res, 200, responseMessageContent, serviceName);

    next();
});

exports.deleteContent = catchAsync(async (req, res, next) => {
    const { filter } = req.body;

    const responseMessageContent = await QueueUtil.sendMessageToQueue(
        Queues.CONTENT_DELETE, {}, {}, { filter },
    );

    sendCustomResponse(res, 200, responseMessageContent, serviceName);

    next();
});
