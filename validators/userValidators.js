const Joi = require('joi');

const usernameRegex = /^[a-zA-Z0-9_.-]{3,30}$/;

const registerSchema = Joi.object({
    name: Joi.string().trim().min(2).max(80).required(),
    email: Joi.string().email().lowercase().trim().required(),
    username: Joi.string().pattern(usernameRegex).required()
        .messages({ 'string.pattern.base': 'Username 3-30 chars, letters/digits/._-' }),
    password: Joi.string().min(6).max(128).required(),
    role: Joi.string().valid('user', 'admin', 'guest').optional()
});

const loginSchema = Joi.object({
    email: Joi.string().email().lowercase().trim().required(),
    password: Joi.string().required()
});

const guestLoginSchema = Joi.object({
    name: Joi.string().trim().min(1).max(80).required(),
    email: Joi.string().email().lowercase().trim().required()
});

const forgotPasswordSchema = Joi.object({
    email: Joi.string().email().lowercase().trim().required()
});

const updateProfileSchema = Joi.object({
    name: Joi.string().trim().min(2).max(80).optional(),
    bio: Joi.string().allow('').max(500).optional(),
    links: Joi.array().items(Joi.object({
        title: Joi.string().max(60).required(),
        url: Joi.string().uri().max(500).required()
    })).max(5).optional(),
    currentPassword: Joi.string().optional(),
    password: Joi.string().min(6).max(128).optional()
}).with('password', 'currentPassword');

const adminCreateUserSchema = Joi.object({
    name: Joi.string().trim().min(2).max(80).required(),
    email: Joi.string().email().lowercase().trim().required(),
    username: Joi.string().pattern(usernameRegex).optional(),
    password: Joi.string().min(6).max(128).when('role', {
        is: 'guest',
        then: Joi.optional(),
        otherwise: Joi.required()
    }),
    role: Joi.string().valid('user', 'admin', 'guest').optional()
});

const adminUpdateUserSchema = Joi.object({
    name: Joi.string().trim().min(2).max(80).optional(),
    email: Joi.string().email().lowercase().trim().optional(),
    username: Joi.string().pattern(usernameRegex).optional(),
    password: Joi.string().min(6).max(128).optional(),
    role: Joi.string().valid('user', 'admin', 'guest').optional()
});

const updateRoleSchema = Joi.object({
    role: Joi.string().valid('user', 'admin', 'guest').required()
});

module.exports = {
    registerSchema,
    loginSchema,
    guestLoginSchema,
    forgotPasswordSchema,
    updateProfileSchema,
    adminCreateUserSchema,
    adminUpdateUserSchema,
    updateRoleSchema
};
