const Joi = require('joi');

const getTopContentServiceSchema = Joi.object({
    top_contents: Joi.array().items(Joi.object({
        _id: Joi.string().required(),
        content: Joi.string().required(),
        total_interactions: Joi.number().required(),
    })).min(0).required(),
    total: Joi.number().required(),
}).options({ abortEarly: false });

module.exports = getTopContentServiceSchema;

