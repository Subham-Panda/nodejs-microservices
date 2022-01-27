const Joi = require('joi');

const deleteContentServiceSchema = Joi.object({
    filter: Joi.alternatives().try(
        Joi.object({
            title: Joi.string().trim().optional(),
            stroy: Joi.string().trim().optional(),
        }),
        Joi.object({
            _id: Joi.string().required(),
        })
    )
}).options({ abortEarly: false });

module.exports = deleteContentServiceSchema;
