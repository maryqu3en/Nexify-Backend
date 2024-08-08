const Message = require('../models/message.model');

const broadcastMessage = async (io, chatRoomId, userId, content) => {
  try {
    const message = new Message({ chatRoom: chatRoomId, user: userId, content });
    await message.save();
    io.to(chatRoomId).emit('message', message);
  } catch (err) {
    console.error('Error broadcasting message:', err);
  }
};

const joinChatRoom = (socket, chatRoomId) => {
  socket.join(chatRoomId);
};

const leaveChatRoom = (socket, chatRoomId) => {
  socket.leave(chatRoomId);
};

module.exports = {
  broadcastMessage,
  joinChatRoom,
  leaveChatRoom,
};