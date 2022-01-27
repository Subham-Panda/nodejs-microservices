const Content = require('../model/content.model');

const createContentDbHandler = async (data) => {
    try {
        const newContent = await Content.create(data);
        return newContent;
    } catch (error) {
        return { error: error };
    }   
}

const getContentDbHandler = async (data) => {
    try {
        const contents = await Content.find(data.filter);
        return contents;
    } catch (error) {
        return { error: error };
    }  
}

const updateContentDbHandler = async (data) => {
    try {
        const updatedContents = await Content.updateMany(data.filter, data.update, { new: true });
        return updatedContents;
    } catch (error) {
        return { error: error };
    }  
}

const deleteContentDbHandler = async (data) => {
    try {
        const deletedContents = await Content.deleteMany(data.filter);
        return deletedContents;
    } catch (error) {
        return { error: error };
    }  
}

const getNewContentDbHandler = async (data) => {
    try {
        const newContents = await Content.find().limit(data.total ? data.total : 10).sort({
            createdAt: -1
        })
        return newContents;
    } catch (error) {
        return { error: error };
    }  
}

module.exports = {
    createContentDbHandler,
    getContentDbHandler,
    updateContentDbHandler,
    deleteContentDbHandler,
    getNewContentDbHandler
}