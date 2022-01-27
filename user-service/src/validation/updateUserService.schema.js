const Joi = require('joi');

const updateUserServiceSchema = Joi.alternatives().try(
    Joi.object({
        filter: Joi.object({
            first_name: Joi.string().trim().optional(),
            last_name: Joi.string().trim().optional(),
            email: Joi.string().trim().email().optional(),
            phone: Joi.number().min(1000000000).max(9999999999).optional(),
        }),
        update: Joi.object({
            first_name: Joi.string().trim().optional(),
            last_name: Joi.string().trim().optional(),
            email: Joi.string().trim().email().optional(),
            phone: Joi.number().min(1000000000).max(9999999999).optional(),
        })
    }),
    Joi.object({
        id: Joi.number().required(),
    })
).options({ abortEarly: false });

module.exports = updateUserServiceSchema;
