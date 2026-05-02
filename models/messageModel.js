const mongoose = require('mongoose');

const messageSchema = mongoose.Schema({
    meetingId: {
        type: String, // Can be meetingCode or ObjectId
        required: true
    },
    senderId: {
        type: String, // Allow strings for Guest IDs
        required: true
    },
    senderName: String,
    text: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
