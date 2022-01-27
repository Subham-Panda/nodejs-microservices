const Joi = require('joi');

const deleteUserServiceSchema = Joi.alternatives().try(
    Joi.object({
        first_name: Joi.string().trim().optional(),
        last_name: Joi.string().trim().optional(),
        email: Joi.string().trim().email().optional(),
        phone: Joi.number().min(1000000000).max(9999999999).optional(),
    }),
    Joi.object({
        id: Joi.number().required(),
    })
).options({ abortEarly: false });

module.exports = deleteUserServiceSchema;
