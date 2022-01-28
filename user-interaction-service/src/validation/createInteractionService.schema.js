const Joi = require('joi');

const createInteractionServiceSchema = Joi.object({
    content_id: Joi.string().required(),
}).options({ abortEarly: false });

module.exports = createInteractionServiceSchema;
