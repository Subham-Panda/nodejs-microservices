const Joi = require('joi');
const { interactionContentServiceSchema,createInteractionServiceSchema, interactionTopContentServiceSchema } = require('../validation');
const { likeContentDbHandler, unlikeContentDbHandler, readContentDbHandler, createInteractionDbHandler, getTopContentsDbHandler } = require('../db/handler/interaction.db.handler');
const logger = require('../logger/logger');
const QueueUtil = require('../util/queue.util');
const Queues = require('../enum/queues');

const likeContent = async (data) => {
    const validationResponse = interactionContentServiceSchema.validate(data)

    if (validationResponse.error) {
        logger.error(`[InteractionService] likeUnlikeContent validation error: ${validationResponse.error.details[0].message}`);
        return { error: validationResponse.error.details[0].message };
    }

    const response = await likeContentDbHandler(data);

    return response;
}

const unlikeContent = async (data) => {
    const validationResponse = interactionContentServiceSchema.validate(data)

    if (validationResponse.error) {
        logger.error(`[InteractionService] likeUnlikeContent validation error: ${validationResponse.error.details[0].message}`);
        return { error: validationResponse.error.details[0].message };
    }

    const response = await unlikeContentDbHandler(data);

    return response;
}

const readContent = async (data) => {
    const validationResponse = interactionContentServiceSchema.validate(data)

    if (validationResponse.error) {
        logger.error(`[InteractionService] readContent validation error: ${validationResponse.error.details[0].message}`);
        return { error: validationResponse.error.details[0].message };
    }

    const response = await readContentDbHandler(data);

    return response;
}

const createInteraction = async (data) => {
    const validationResponse = createInteractionServiceSchema.validate(data)

    if (validationResponse.error) {
        logger.error(`[InteractionService] createInteraction validation error: ${validationResponse.error.details[0].message}`);
        return { error: validationResponse.error.details[0].message };
    }

    await createInteractionDbHandler(data);
}

const getTopContents= async (data) => {
    const validationResponse = interactionTopContentServiceSchema.validate(data)

    if (validationResponse.error) {
        logger.error(`[InteractionService] getTopContents validation error: ${validationResponse.error.details[0].message}`);
        return { error: validationResponse.error.details[0].message };
    }

    const response = await getTopContentsDbHandler(data); 

    return response;
}

module.exports = { 
    likeContent,
    unlikeContent,
    readContent,
    createInteraction,
    getTopContents
}