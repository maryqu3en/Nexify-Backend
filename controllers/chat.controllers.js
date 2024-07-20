const ChatRoom = require('../models/chatroom.model');
const User = require('../models/user.model');

exports.createChatRoom = async (req, res) => {
    try {
        const { name, userIds } = req.body;
        const chatRoom = new ChatRoom({ name, users: userIds });
        await chatRoom.save();
        res.status(201).json({ message: 'Chat room created successfully', chatRoom });
    } catch (error) {
        res.status(500).json({ error: 'Server error during chat room creation' });
    }
};

exports.addUserToChatRoom = async (req, res) => {
    try {
        const { chatRoomId, userId } = req.body;
        const chatRoom = await ChatRoom.findById(chatRoomId);
        if (!chatRoom) {
            return res.status(404).json({ error: 'Chat room not found' });
        }
        chatRoom.users.push(userId);
        await chatRoom.save();
        res.status(200).json({ message: 'User added to chat room successfully', chatRoom });
    } catch (error) {
        res.status(500).json({ error: 'Server error during adding user to chat room' });
    }
};

exports.getChatRoom = async (req, res) => {
    try {
        const { chatRoomId } = req.params;
        const chatRoom = await ChatRoom.findById(chatRoomId).populate('users', 'username email');
        if (!chatRoom) {
            return res.status(404).json({ error: 'Chat room not found' });
        }
        res.status(200).json(chatRoom);
    } catch (error) {
        res.status(500).json({ error: 'Server error during fetching chat room' });
    }
};

exports.getUserChats = async (req, res) => {
    try {
        const userId = req.user._id;
        const chatRooms = await ChatRoom.find({ users: userId }).populate('users');
        res.status(200).send(chatRooms);
    } catch (error) {
        res.status(500).send(error);
    }
};