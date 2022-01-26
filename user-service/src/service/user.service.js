const Joi = require('joi');
const { createUserServiceSchema } = require('../validation');
const { createUserDbHandler } = require('../db/handler/user.db.handler');
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

const getUser = (data) => {

}

const updateUser = (data) => {

}

const deleteUser = (data) => {

}

module.exports = {
    createUser,
    getUser,
    updateUser,
    deleteUser,
}