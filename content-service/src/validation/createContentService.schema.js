const Joi = require('joi');

const createContentServiceSchema = Joi.object({
    title: Joi.string().trim().required(),
    story: Joi.string().trim().required(),
}).options({ abortEarly: false });

module.exports = createContentServiceSchema;
