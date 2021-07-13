const { Joi } = require('express-validation')

exports.follow = {
    body: Joi.object({
      who_follow: Joi.required(),
    }),
}