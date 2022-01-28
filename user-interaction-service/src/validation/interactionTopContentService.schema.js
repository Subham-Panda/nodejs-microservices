const Joi = require('joi');

const interactionTopContentServiceSchema = Joi.object({
    total: Joi.number().required(),
})

module.exports = interactionTopContentServiceSchema;
