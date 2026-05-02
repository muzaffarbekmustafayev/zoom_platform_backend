const express = require('express');
const { createMeeting, getMeetingByCode, getMyMeetings, deleteMeeting, promoteToCoHost, removeCoHost } = require('../controllers/meetingController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.route('/').post(protect, createMeeting).get(protect, getMyMeetings);
router.route('/:code').get(getMeetingByCode);
router.route('/:id').delete(protect, deleteMeeting);
router.route('/:id/cohost').post(protect, promoteToCoHost).delete(protect, removeCoHost);

module.exports = router;
