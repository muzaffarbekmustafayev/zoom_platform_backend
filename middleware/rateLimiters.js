const rateLimit = require('express-rate-limit');

const isProd = process.env.NODE_ENV === 'production';

const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: isProd ? 10 : 100,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many attempts, please try again later' }
});

const apiLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: isProd ? 120 : 1000,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many requests, please slow down' }
});

const passwordResetLimiter = rateLimit({
    windowMs: 60 * 60 * 1000,
    max: isProd ? 5 : 50,
    standardHeaders: true,
    legacyHeaders: false,
    message: { message: 'Too many password reset attempts' }
});

module.exports = { authLimiter, apiLimiter, passwordResetLimiter };
