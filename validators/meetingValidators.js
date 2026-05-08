const Joi = require('joi');

const createMeetingSchema = Joi.object({
    title: Joi.string().trim().max(120).optional(),
    roomType: Joi.string().valid('public', 'private').optional(),
    password: Joi.string().min(4).max(64).when('roomType', {
        is: 'private',
        then: Joi.required(),
        otherwise: Joi.forbidden()
    })
});

const updateMeetingSchema = Joi.object({
    title: Joi.string().trim().max(120).optional(),
    isPinned: Joi.boolean().optional()
});

const cohostSchema = Joi.object({
    userId: Joi.string().hex().length(24).required()
});

module.exports = { createMeetingSchema, updateMeetingSchema, cohostSchema };
