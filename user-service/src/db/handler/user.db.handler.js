const User = require('../model/user.model');

const createUserDbHandler = async (data) => {
    try {
        const newUser = await User.create(data);
        return newUser;
    } catch (error) {
        return { error: error };
    }   
}

const getUserDbHandler = async (data) => {
    try {
        const users = await User.find(data.filter);
        return users;
    } catch (error) {
        return { error: error };
    }  
}

const updateUserDbHandler = async (data) => {
    try {
        const updatedUsers = await User.updateMany(data.filter, data.update, { new: true });
        return updatedUsers;
    } catch (error) {
        return { error: error };
    }  
}

const deleteUserDbHandler = async (data) => {
    try {
        const deletedUsers = await User.deleteMany(data.filter);
        return deletedUsers;
    } catch (error) {
        return { error: error };
    }  
}

const verifyUserDbHandler = async (data) => {
    try {
        const user = await User.findById(data.user_id);
        return user ? { exists: true } : { exists: false };
    } catch (error) {
        return { error: error };
    }  
}

module.exports = {
    createUserDbHandler,
    getUserDbHandler,
    updateUserDbHandler,
    deleteUserDbHandler,
    verifyUserDbHandler
}