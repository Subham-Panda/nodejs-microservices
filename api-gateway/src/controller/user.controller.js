const Queues = require('../enum/queues');
const catchAsync = require('../util/catchAsync.util');
const QueueUtil = require('../util/queue.util');

exports.getUser = catchAsync(async (req, res, next) => {
    const { filter } = req.body;

    await QueueUtil.sendMessageToQueueAndWait(
        res, Queues.USER_READ, {}, {}, { filter },
    );

});

exports.createUser = catchAsync(async (req, res, next) => {
    const { first_name, last_name, email, phone } = req.body;

    await QueueUtil.sendMessageToQueueAndWait(
        res, Queues.USER_CREATE, {}, {}, { first_name, last_name, email, phone },
    );

});

exports.updateUser = catchAsync(async (req, res, next) => {
    const { filter, update } = req.body;

    await QueueUtil.sendMessageToQueueAndWait(
        res, Queues.USER_UPDATE, {}, {}, { filter, update },
    );

});

exports.deleteUser = catchAsync(async (req, res, next) => {
    const { filter } = req.body;
 
    await QueueUtil.sendMessageToQueueAndWait(
        res, Queues.USER_DELETE, {}, {}, { filter },
    );
});
