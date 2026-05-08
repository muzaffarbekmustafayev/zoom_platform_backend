const express = require('express');
const {
    createMeeting, getMeetingByCode, getMyMeetings, deleteMeeting, updateMeeting,
    promoteToCoHost, removeCoHost, getPinnedMeetings, getMeetingActivity
} = require('../controllers/meetingController');
const { protect, host } = require('../middleware/authMiddleware');
const { validate, validateObjectId } = require('../middleware/validate');
const { createMeetingSchema, updateMeetingSchema, cohostSchema } = require('../validators/meetingValidators');

const router = express.Router();

router.route('/')
    .post(protect, host, validate(createMeetingSchema), createMeeting)
    .get(protect, getMyMeetings);

router.get('/pinned', protect, getPinnedMeetings);
router.get('/activity', protect, getMeetingActivity);

router.get('/:code', getMeetingByCode);

router.route('/:id')
    .delete(protect, validateObjectId('id'), deleteMeeting)
    .put(protect, validateObjectId('id'), validate(updateMeetingSchema), updateMeeting);

router.route('/:id/cohost')
    .post(protect, validateObjectId('id'), validate(cohostSchema), promoteToCoHost)
    .delete(protect, validateObjectId('id'), validate(cohostSchema), removeCoHost);

module.exports = router;
