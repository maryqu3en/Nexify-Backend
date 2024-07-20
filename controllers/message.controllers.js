const Message = require('../models/message.model');
const ChatRoom = require('../models/chatroom.model');

exports.sendMessage = async (req, res) => {
    try {
        const { chatRoomId, userId, content } = req.body;
        const chatRoom = await ChatRoom.findById(chatRoomId);
        if (!chatRoom) {
            return res.status(404).json({ error: 'Chat room not found' });
        }
        const message = new Message({ chatRoom: chatRoomId, user: userId, content });
        await message.save();
        res.status(201).json({ message: 'Message sent successfully', message });
    } catch (error) {
        res.status(500).json({ error: 'Server error during sending message' });
    }
};

exports.getMessages = async (req, res) => {
    try {
        const { chatRoomId } = req.params;
        const messages = await Message.find({ chatRoom: chatRoomId }).populate('user', 'username email');
        res.status(200).json(messages);
    } catch (error) {
        res.status(500).json({ error: 'Server error during fetching messages' });
    }
};
