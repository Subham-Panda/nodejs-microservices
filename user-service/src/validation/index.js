const createUserServiceSchema = require('./createUserService.schema');
const updateUserServiceSchema = require('./updateUserService.schema');
const deleteUserServiceSchema = require('./deleteUserService.schema');
const getUserServiceSchema = require('./getUserService.schema');
const verifyUserServiceSchema = require('./verifyUserService.schema');

module.exports = {
    createUserServiceSchema,
    getUserServiceSchema,
    updateUserServiceSchema,
    deleteUserServiceSchema,
    verifyUserServiceSchema,
}