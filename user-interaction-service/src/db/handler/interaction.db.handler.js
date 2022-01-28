const Interaction = require('../model/interaction.model');

const likeContentDbHandler = async (data) => {
    try {
        const resp = await Interaction.findOneAndUpdate({
            content: data.content_id
        }, {
            // add data.user to liked_users
            $addToSet: {
                liked_users: data.user_id
            },

            // increment total_interactions
            $inc: {
                total_interactions: 1
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
            },

            // decrement total_interactions
            $inc: {
                total_interactions: -1
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
            },

            // increment total_interactions
            $inc: {
                total_interactions: 1
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
            content: data.content_id,
            liked_users: [],
            read_users: [],
            inc_id: data.inc_id,
            total_interactions: 0
        })
    } catch (error) {
        return { error: error };
    }
}

const getTopContentsDbHandler = async (data) => {
    try {
        const topContents = await Interaction.find({}, {
            inc_id: 1,
            content: 1,
            total_interactions: 1
        }).sort({
            total_interactions: -1,
            inc_id: -1
        }).select("content total_interactions -inc_id").limit(data.total ? data.total : 10);
        return {
            top_contents: topContents,
            total: topContents.length
        }
    } catch (error) {
        return { error: error };
    }
}

module.exports = {
    likeContentDbHandler,
    unlikeContentDbHandler,
    readContentDbHandler,
    createInteractionDbHandler,
    getTopContentsDbHandler
}