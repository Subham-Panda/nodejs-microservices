const User = require('../model/user.model');
// const logger = require('../../logger/logger');

const createUserDbHandler = async (data) => {
    try {
        const newUser = await User.create(data);
        return newUser;
    } catch (error) {
        return { error: error };
    }   
}

module.exports = {
    createUserDbHandler
}