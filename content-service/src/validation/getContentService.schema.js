const Joi = require('joi');

const getContentServiceSchema = Joi.object({
    filter: Joi.alternatives().try(
        Joi.object({
            title: Joi.string().trim().optional(),
            story: Joi.string().trim().optional(),
        }),
        Joi.object({
            _id: Joi.string().required(),
        })
    )
}).options({ abortEarly: false });

module.exports = getContentServiceSchema;
