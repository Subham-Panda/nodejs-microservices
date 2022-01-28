const Joi = require('joi');

const createInteractionServiceSchema = Joi.object({
    content_id: Joi.string().required(),
        inc_id: Joi.number().required(),
}).options({ abortEarly: false });

module.exports = createInteractionServiceSchema;
