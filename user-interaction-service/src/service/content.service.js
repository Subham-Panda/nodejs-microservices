const Joi = require('joi');
const { createContentServiceSchema, getContentServiceSchema, updateContentServiceSchema, deleteContentServiceSchema, getNewContentServiceSchema } = require('../validation');
const { createContentDbHandler, getContentDbHandler, updateContentDbHandler, deleteContentDbHandler, getNewContentDbHandler } = require('../db/handler/content.db.handler');
const logger = require('../logger/logger');

const createContent = async (data) => {
    const validationResponse = createContentServiceSchema.validate(data)

    if (validationResponse.error) {
        logger.error(`[ContentService] createContent validation error: ${validationResponse.error.details[0].message}`);
        return { error: validationResponse.error.details[0].message };
    }

    const response = await createContentDbHandler(data);

    return response;
}

const getContent = async (data) => {
    const validationResponse = getContentServiceSchema.validate(data)

    if (validationResponse.error) {
        logger.error(`[ContentService] getContent validation error: ${validationResponse.error.details[0].message}`);
        return { error: validationResponse.error.details[0].message };
    }

    const response = await getContentDbHandler(data);

    return response;
}

const updateContent = async (data) => {
    const validationResponse = updateContentServiceSchema.validate(data)

    if (validationResponse.error) {
        logger.error(`[ContentService] updateContent validation error: ${validationResponse.error.details[0].message}`);
        return { error: validationResponse.error.details[0].message };
    }

    const response = await updateContentDbHandler(data);

    return response;
}

const deleteContent = async (data) => {
    const validationResponse = deleteContentServiceSchema.validate(data)

    if (validationResponse.error) {
        logger.error(`[ContentService] deleteContent validation error: ${validationResponse.error.details[0].message}`);
        return { error: validationResponse.error.details[0].message };
    }

    const response = await deleteContentDbHandler(data);

    return response;
}

const getNewContent = async (data) => {
    const validationResponse = getNewContentServiceSchema.validate(data)

    if (validationResponse.error) {
        logger.error(`[ContentService] getNewContent validation error: ${validationResponse.error.details[0].message}`);
        return { error: validationResponse.error.details[0].message };
    }

    const response = await getNewContentDbHandler(data);

    return response;
}

module.exports = {
    createContent,
    getContent,
    updateContent,
    deleteContent,
    getNewContent
}