const express = require('express');
const router = express.Router();
const { getStats, getAllUsers, updateUserRole, toggleBlockUser, createUser, updateUser, getAllMeetings, deleteMeeting } = require('../controllers/adminController');
const { protect, admin } = require('../middleware/authMiddleware');

router.get('/stats', protect, admin, getStats);
router.get('/users', protect, admin, getAllUsers);
router.post('/users', protect, admin, createUser);
router.put('/users/:id', protect, admin, updateUser);
router.put('/users/:id/role', protect, admin, updateUserRole);
router.put('/users/:id/block', protect, admin, toggleBlockUser);

router.get('/meetings', protect, admin, getAllMeetings);
router.delete('/meetings/:id', protect, admin, deleteMeeting);

module.exports = router;
