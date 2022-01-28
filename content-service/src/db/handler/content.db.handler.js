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

const getTopContentDbHandler = async (data) => {
    try {
        const topContentIds = data.top_contents.map(content => content.content);
        
        // map total interactions to top content ids in top content documents
        const topContents = await Content.find({
            _id: {
                $in: topContentIds
            }
        });


        // add total interactions to top content documents
        const topContentsWithTotalInteractions = topContents.map(topContent => {
            const totalInteractions = data.top_contents.find(content => content.content === topContent._id.toString()).total_interactions;
            return {
                ...topContent.toObject(),
                total_interactions: totalInteractions
            }
        });


        //sort by total interactions
        const topContentsSorted = topContentsWithTotalInteractions.sort((a, b) => {
            return b.total_interactions - a.total_interactions;
        });


        return topContentsSorted;
    } catch (error) {
        return { error: error };
    }
}

module.exports = {
    createContentDbHandler,
    getContentDbHandler,
    updateContentDbHandler,
    deleteContentDbHandler,
    getNewContentDbHandler,
    getTopContentDbHandler
}