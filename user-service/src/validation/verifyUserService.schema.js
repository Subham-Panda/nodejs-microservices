const Joi = require('joi');

const verifyUserServiceSchema = Joi.object({
    user_id: Joi.string().required(),
}).options({ abortEarly: false });

module.exports = verifyUserServiceSchema;
