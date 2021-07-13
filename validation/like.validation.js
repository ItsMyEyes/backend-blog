const { Joi } = require('express-validation')

exports.like = {
    body: Joi.object({
        id_post: Joi.string().required(),
    }),
}