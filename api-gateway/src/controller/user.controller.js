const Queues = require('../enum/queues');
const Services = require('../enum/services');
const catchAsync = require('../util/catchAsync');
const QueueUtil = require('../util/QueueUtil');
const sendCustomResponse = require('../util/sendCustomResponse');

const serviceName = Services.USER_SERVICE;

exports.getUser = catchAsync(async (req, res, next) => {
    const { filter } = req.body;

    const responseMessageContent = await QueueUtil.sendMessageToQueue(
        Queues.USER_READ, {}, {}, { filter },
    );

    sendCustomResponse(res, 200, responseMessageContent, serviceName);

    next();
});

exports.createUser = catchAsync(async (req, res, next) => {
    const { title, story } = req.body;

    const responseMessageContent = await QueueUtil.sendMessageToQueue(
        Queues.USER_CREATE, {}, {}, { title, story },
    );

    sendCustomResponse(res, 201, responseMessageContent, serviceName);

    next();
});

exports.updateUser = catchAsync(async (req, res, next) => {
    const { filter, update } = req.body;

    const responseMessageContent = await QueueUtil.sendMessageToQueue(
        Queues.USER_UPDATE, {}, {}, { filter, update },
    );

    sendCustomResponse(res, 200, responseMessageContent, serviceName);

    next();
});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const { filter } = req.body;

    const responseMessageContent = await QueueUtil.sendMessageToQueue(
        Queues.USER_DELETE, {}, {}, { filter },
    );

    sendCustomResponse(res, 200, responseMessageContent, serviceName);

    next();
});
