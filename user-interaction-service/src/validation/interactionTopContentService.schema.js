const Joi = require('joi');

const interactionTopContentServiceSchema = Joi.object({
    total: Joi.number().optional(),
})

module.exports = interactionTopContentServiceSchema;
