const { Joi } = require('express-validation')

exports.loginValidation = {
    body: Joi.object({
      emailOrUsername: Joi.string().required(),
      password: Joi.string()
        .regex(/[a-zA-Z0-9]{3,30}/)
        .required(),
    }),
}

exports.registerValidation = {
    body: Joi.object({
        email: Joi.string()
            .email()
            .required(),
        password: Joi.string()
            .regex(/[a-zA-Z0-9]{3,30}/)
            .length(8)
            .required(),
        username: Joi.string()
            .required()
            .regex(/[a-zA-Z0-9]{3,30}/),
        name: Joi.string()
            .required(),
        profile_photo: Joi.string()
            .required()
    }),
}