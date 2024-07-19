const express = require('express');
const socketIo = require('socket.io');
const connectDB = require('./config/mongodb');
const cors = require('cors');
require('dotenv').config();
const { swaggerUi, specs } = require("./docs/swagger");
const authRouter = require('./routes/auth.routes');
// const userRouter = require('./routes/user.routes');
// const chatRouter = require('./routes/chat.routes');
const socketHelper = require('./helpers/socket.helpers');


const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
  res.send("Welcome to Nexify, a Chat App API.");
});

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use('/api', authRouter);
// app.use('/api', userRouter);
// app.use('/api', chatRouter);

connectDB();

const server = app.listen(PORT, () => {
    console.log(`server running in http://localhost:${PORT}`);
});

const io = socketIo(server);

io.on('connection', (socket) => {
  console.log(`New client connected: ${socket.id}`);

  socket.on('joinRoom', (chatRoomId) => {
    socketHelper.joinChatRoom(socket, chatRoomId);
  });

  socket.on('leaveRoom', (chatRoomId) => {
    socketHelper.leaveChatRoom(socket, chatRoomId);
  });

  socket.on('sendMessage', async (data) => {
    const { chatRoomId, userId, content } = data;
    await socketHelper.broadcastMessage(io, chatRoomId, userId, content);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});