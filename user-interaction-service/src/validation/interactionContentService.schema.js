const Joi = require('joi');

const interactionContentServiceSchema = Joi.object({
    content_id: Joi.string().required(),
    user_id: Joi.string().required(),
}).options({ abortEarly: false });

module.exports = interactionContentServiceSchema;
