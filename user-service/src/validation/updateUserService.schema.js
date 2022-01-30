const Joi = require('joi');

const updateUserServiceSchema = Joi.object({
    filter: Joi.alternatives().try(
        Joi.object({
            first_name: Joi.string().trim().optional(),
            last_name: Joi.string().trim().optional(),
            email: Joi.string().trim().email().optional(),
            phone: Joi.number().min(1000000000).max(9999999999).optional(),
        }),
        Joi.object({
            _id: Joi.string().required(),
        })
    ).required(),
    update: Joi.object({
        first_name: Joi.string().trim().optional(),
        last_name: Joi.string().trim().optional(),
        email: Joi.string().trim().email().optional(),
        phone: Joi.number().min(1000000000).max(9999999999).optional(),
    }).required()
})

module.exports = updateUserServiceSchema;
