const { Joi } = require('express-validation')

exports.post = {
    body: Joi.object({
        title: Joi.string().required(),
        custom_url: Joi.string()
    }),
}