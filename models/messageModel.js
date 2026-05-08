const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    meetingId: {
        type: String,
        required: true,
        index: true
    },
    senderId: {
        type: String,
        required: true
    },
    senderName: String,
    text: {
        type: String,
        required: true,
        maxlength: 2000
    }
}, {
    timestamps: true
});

messageSchema.index({ meetingId: 1, createdAt: 1 });

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
