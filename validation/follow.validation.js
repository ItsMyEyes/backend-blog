const { Joi } = require('express-validation')

exports.follow = {
    body: Joi.object({
      id_follow: Joi.required(),
      who_follow: Joi.required(),
    }),
}