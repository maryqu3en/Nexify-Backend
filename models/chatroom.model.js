const mongoose = require('mongoose');

const ChatRoomSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    users: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }],
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    deletedAt:{
        type: Date,
        default: null
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

ChatRoomSchema.virtual("messages", {
    ref: "Message",
    foreignField: "chatRoom",
    localField: "_id",
  });

const ChatRoom = mongoose.model('ChatRoom', ChatRoomSchema);

module.exports = ChatRoom;
