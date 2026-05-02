const Meeting = require('../models/meetingModel');

const createMeeting = async (req, res) => {
    const { title, password } = req.body;
    
    const generateCode = () => {
        const p1 = Math.random().toString(36).substring(2, 5);
        const p2 = Math.random().toString(36).substring(2, 6);
        const p3 = Math.random().toString(36).substring(2, 5);
        return `${p1}-${p2}-${p3}`;
    };

    try {
        const meeting = await Meeting.create({
            hostId: req.user._id,
            title: title || `${req.user.name}'s Meeting`,
            meetingCode: generateCode(),
            password
        });
        res.status(201).json(meeting);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

const getMeetingByCode = async (req, res) => {
    const meeting = await Meeting.findOne({ meetingCode: req.params.code })
        .populate('hostId', 'name email avatar')
        .populate('coHosts', 'name email');

    if (meeting) {
        res.json(meeting);
    } else {
        res.status(404).json({ message: "Meeting not found" });
    }
};

const getMyMeetings = async (req, res) => {
    const meetings = await Meeting.find({ hostId: req.user._id }).sort({ createdAt: -1 });
    res.json(meetings);
};

const deleteMeeting = async (req, res) => {
    try {
        const meeting = await Meeting.findById(req.params.id);
        if (!meeting) return res.status(404).json({ message: "Meeting not found" });

        if (meeting.hostId.toString() !== req.user._id.toString()) {
            return res.status(401).json({ message: "Not authorized to delete this meeting" });
        }

        await meeting.deleteOne();
        res.json({ message: "Meeting removed" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const promoteToCoHost = async (req, res) => {
    try {
        const meeting = await Meeting.findById(req.params.id);
        if (!meeting) return res.status(404).json({ message: "Meeting not found" });
        if (String(meeting.hostId) !== String(req.user._id))
            return res.status(401).json({ message: "Only host can promote co-hosts" });

        const { userId } = req.body;
        if (!meeting.coHosts.map(String).includes(String(userId))) {
            meeting.coHosts.push(userId);
            await meeting.save();
        }
        res.json({ message: "Promoted to co-host", coHosts: meeting.coHosts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const removeCoHost = async (req, res) => {
    try {
        const meeting = await Meeting.findById(req.params.id);
        if (!meeting) return res.status(404).json({ message: "Meeting not found" });
        if (String(meeting.hostId) !== String(req.user._id))
            return res.status(401).json({ message: "Only host can manage co-hosts" });

        const { userId } = req.body;
        meeting.coHosts = meeting.coHosts.filter(id => String(id) !== String(userId));
        await meeting.save();
        res.json({ message: "Co-host removed", coHosts: meeting.coHosts });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { createMeeting, getMeetingByCode, getMyMeetings, deleteMeeting, promoteToCoHost, removeCoHost };
