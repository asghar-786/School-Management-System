const Joi = require('joi');

const validateTeacher = Joi.object({
    name:Joi.string().required(),
    userName: Joi.string().required(),
    email: Joi.string().pattern(new RegExp(/(\w+|\.+\w+){1,10}@[a-zA-Z0-9]+\.([a-zA-Z0-9]+|\.[a-zA-Z0-9]+){1,3}/)).required().messages({
        'string.pattern.base': 'Please provide a valid email address',
        'any.required': 'Email is required'
    }),
    password: Joi.string().required().pattern(new RegExp(/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)).messages({
        'string.pattern.base': 'Password must contain at least one letter, one number, one special character, and be at least 8 characters long',
        'any.required': 'Password is required'
    }),
    profession:Joi.string().required(),
    salary:Joi.number().required(),
    experience:Joi.number().required()
   
})


const loginValidation = Joi.object({
    userName: Joi.string(),
    email: Joi.string().pattern(new RegExp(/(\w+|\.+\w+){1,10}@[a-zA-Z0-9]+\.([a-zA-Z0-9]+|\.[a-zA-Z0-9]+){1,3}/)).messages({
        'string.pattern.base': 'Please provide a valid email address',
    }),
    password: Joi.string().required()
}).xor('userName', 'email')

module.exports = {validateTeacher, loginValidation};
