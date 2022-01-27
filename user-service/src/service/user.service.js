const Joi = require('joi');
const { createUserServiceSchema, getUserServiceSchema, updateUserServiceSchema, deleteUserServiceSchema } = require('../validation');
const { createUserDbHandler, getUserDbHandler, updateUserDbHandler, deleteUserDbHandler } = require('../db/handler/user.db.handler');
const logger = require('../logger/logger');

const createUser = async (data) => {
    const validationResponse = createUserServiceSchema.validate(data)

    if (validationResponse.error) {
        logger.error(`[UserService] createUser validation error: ${validationResponse.error.details[0].message}`);
        return { error: validationResponse.error.details[0].message };
    }

    const response = await createUserDbHandler(data);

    return response;
}

const getUser = async (data) => {
    const validationResponse = getUserServiceSchema.validate(data)

    if (validationResponse.error) {
        logger.error(`[UserService] getUser validation error: ${validationResponse.error.details[0].message}`);
        return { error: validationResponse.error.details[0].message };
    }

    const response = await getUserDbHandler(data);

    return response;
}

const updateUser = async (data) => {
    const validationResponse = updateUserServiceSchema.validate(data)

    if (validationResponse.error) {
        logger.error(`[UserService] updateUser validation error: ${validationResponse.error.details[0].message}`);
        return { error: validationResponse.error.details[0].message };
    }

    const response = await updateUserDbHandler(data);

    return response;
}

const deleteUser = async (data) => {
    const validationResponse = deleteUserServiceSchema.validate(data)

    if (validationResponse.error) {
        logger.error(`[UserService] deleteUser validation error: ${validationResponse.error.details[0].message}`);
        return { error: validationResponse.error.details[0].message };
    }   

    const response = await deleteUserDbHandler(data);

    return response;
}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
}