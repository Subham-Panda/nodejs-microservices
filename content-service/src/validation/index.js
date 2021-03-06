const createContentServiceSchema = require('./createContentService.schema');
const updateContentServiceSchema = require('./updateContentService.schema');
const deleteContentServiceSchema = require('./deleteContentService.schema');
const getContentServiceSchema = require('./getContentService.schema');
const getNewContentServiceSchema = require('./getNewContentService.Schema');
const getTopContentServiceSchema = require('./getTopContentService.schema');

module.exports = {
    createContentServiceSchema,
    getContentServiceSchema,
    updateContentServiceSchema,
    deleteContentServiceSchema,
    getNewContentServiceSchema,
    getTopContentServiceSchema
}