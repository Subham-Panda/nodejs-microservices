const Joi = require('joi');

const updateContentServiceSchema = Joi.object({
    filter: Joi.alternatives().try(
        Joi.object({
            title: Joi.string().trim().optional(),
            story: Joi.string().trim().optional(),
        }),
        Joi.object({
            _id: Joi.string().required(),
        })
    ),
    update: Joi.object({
        title: Joi.string().trim().optional(),
        story: Joi.string().trim().optional(),
    })
})

module.exports = updateContentServiceSchema;
