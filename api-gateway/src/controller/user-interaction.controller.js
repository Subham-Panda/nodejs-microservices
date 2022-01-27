const Queues = require('../enum/queues');
const catchAsync = require('../util/catchAsync.util');
const QueueUtil = require('../util/queue.util');


exports.likeInteraction = catchAsync(async (req, res, next) => {
    const { content_id } = req.body;

    await QueueUtil.sendMessageToQueue(
        res, Queues.INTERACTION_LIKE, {}, {}, { content_id },
    );

});

exports.unlikeInteraction = catchAsync(async (req, res, next) => {
    const { content_id } = req.body;

    await QueueUtil.sendMessageToQueue(
        res, Queues.INTERACTION_UNLIKE, {}, {}, { content_id },
    );

});

exports.readInteraction = catchAsync(async (req, res, next) => {
    const { content_id } = req.body;

    await QueueUtil.sendMessageToQueue(
        res, Queues.INTERACTION_READ, {}, {}, { content_id },
    );

});
