const Interaction = require('../model/interaction.model');

const likeContentDbHandler = async (data) => {
    try {
        const resp = await Interaction.findOneAndUpdate({
            content: data.content_id
        }, {
            // add data.user to liked_users
            $addToSet: {
                liked_users: data.user_id
            }
        })
        return {
            liked_content: data.content_id
        };
    } catch (error) {
        return { error: error };
    }   
}

const unlikeContentDbHandler = async (data) => {
    try {
        await Interaction.findOneAndUpdate({
            content: data.content_id
        }, {
            // remove data.user from liked_users
            $pull: {
                liked_users: data.user_id
            }
        });
        return {
            unliked_content: data.content_id
        };
    } catch (error) {
        return { error: error };
    }  
}

const readContentDbHandler = async (data) => {
    try {
        await Interaction.findOneAndUpdate({
            content: data.content_id
        }, {
            // add data.user to read_users
            $addToSet: {
                read_users: data.user_id
            }
        });
        return {
            read_content: data.content_id
        };
    } catch (error) {
        return { error: error };
    }  
}

const createInteractionDbHandler = async (data) => {
    try {
        await Interaction.create({
            content: data._id,
            liked_users: [],
            read_users: [],
            inc_id: data.inc_id
        })
    } catch (error) {
        return { error: error };
    }
}

module.exports = {
    likeContentDbHandler,
    unlikeContentDbHandler,
    readContentDbHandler,
    createInteractionDbHandler
}