const express = require('express');
const router = express.Router();
const chatController = require('../controllers/chat.controllers');
const auth = require('../middleware/auth.middleware');

/**
 * @swagger
 * /api/chatrooms:
 *   post:
 *     summary: Create a new chat room
 *     description: Creates a new chat room and adds the user to it.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               users:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Chat room created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 users:
 *                   type: array
 *                   items:
 *                     type: string
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

router.post('/chatrooms', auth, chatController.createChatRoom);

/**
 * @swagger
 * /api/chatrooms/addUser:
 *   post:
 *     summary: Add a user to a chat room
 *     description: Adds a user to an existing chat room.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               chatRoomId:
 *                 type: string
 *               userId:
 *                 type: string
 *     responses:
 *       200:
 *         description: User added to chat room successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad Request
 *       404:
 *         description: Chat room or user not found
 *       500:
 *         description: Internal Server Error
 */

router.post('/chatrooms/addUser', auth, chatController.addUserToChatRoom);

/**
 * @swagger
 * /api/chatrooms/{id}:
 *   get:
 *     summary: Get chat room details
 *     description: Retrieve details of a specific chat room by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: Chat room ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Chat room details retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 _id:
 *                   type: string
 *                 name:
 *                   type: string
 *                 users:
 *                   type: array
 *                   items:
 *                     type: string
 *                 messages:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       content:
 *                         type: string
 *                       user:
 *                         type: string
 *       404:
 *         description: Chat room not found
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/chatrooms:
 *   get:
 *     summary: Get all chat rooms of a user
 *     description: Retrieve a list of chat rooms that a specific user is part of.
 *     responses:
 *       200:
 *         description: List of user's chat rooms
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   name:
 *                     type: string
 *                   users:
 *                     type: array
 *                     items:
 *                       type: string
 *                   messages:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         content:
 *                           type: string
 *                         user:
 *                           type: string
 *       404:
 *         description: No chat rooms found
 *       500:
 *         description: Internal Server Error
 */

router.get('/chatrooms/:id', auth, chatController.getChatRoom);


router.get('/chatrooms', auth, chatController.getUserChats);

module.exports = router;
