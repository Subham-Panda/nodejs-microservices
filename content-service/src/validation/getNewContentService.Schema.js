const Joi = require('joi');

const getNewContentServiceSchema = Joi.object({
    total: Joi.number().min(1).optional(),
}).options({ abortEarly: false });

module.exports = getNewContentServiceSchema;
