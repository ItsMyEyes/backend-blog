const { Joi } = require('express-validation')

exports.post = {
    body: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        thumbail_url: Joi.required(),
        url_perma: Joi.string(),
        custom_url: Joi.string(),
        json: Joi.required() 
    }),
}