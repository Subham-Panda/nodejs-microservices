const Joi = require('joi');
const { createContentServiceSchema, getContentServiceSchema, updateContentServiceSchema, deleteContentServiceSchema } = require('../validation');
const { createContentDbHandler, getContentDbHandler, updateContentDbHandler, deleteContentDbHandler } = require('../db/handler/content.db.handler');
const logger = require('../logger/logger');

const createContent = async (data) => {
    const validationResponse = createContentServiceSchema.validate(data)

    if (validationResponse.error) {
        logger.error(`[UserService] createUser validation error: ${validationResponse.error.details[0].message}`);
        return { error: validationResponse.error.details[0].message };
    }

    const response = await createContentDbHandler(data);

    return response;
}

const getContent = async (data) => {
    const validationResponse = getContentServiceSchema.validate(data)

    if (validationResponse.error) {
        logger.error(`[UserService] getUser validation error: ${validationResponse.error.details[0].message}`);
        return { error: validationResponse.error.details[0].message };
    }

    const response = await getContentDbHandler(data);

    return response;
}

const updateContent = async (data) => {
    const validationResponse = updateContentServiceSchema.validate(data)

    if (validationResponse.error) {
        logger.error(`[UserService] updateUser validation error: ${validationResponse.error.details[0].message}`);
        return { error: validationResponse.error.details[0].message };
    }

    const response = await updateContentDbHandler(data);

    return response;
}

const deleteContent = async (data) => {
    const validationResponse = deleteContentServiceSchema.validate(data)

    if (validationResponse.error) {
        logger.error(`[UserService] deleteUser validation error: ${validationResponse.error.details[0].message}`);
        return { error: validationResponse.error.details[0].message };
    }   

    const response = await deleteContentDbHandler(data);

    return response;
}

module.exports = {
    createContent,
    getContent,
    updateContent,
    deleteContent,
}