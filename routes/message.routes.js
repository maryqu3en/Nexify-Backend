const express = require('express');
const { sendMessage, getMessages } = require('../controllers/message.controllers');
const { sendMessageRules, validate } = require('../middleware/validateFields');
const auth = require('../middleware/auth.middleware');

const router = express.Router();

/**
 * @swagger
 * /api/messages/{chatRoomId}:
 *   get:
 *     summary: Get messages for a chat
 *     description: Retrieve all messages for a specific chat.
 *     parameters:
 *       - in: path
 *         name: chatRoomId
 *         description: Chat ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of messages
 *         schema:
 *           type: array
 *           items:
 *             type: object
 *             properties:
 *               _id:
 *                 type: string
 *               content:
 *                 type: string
 *               user:
 *                 type: string
 *               chatRoom:
 *                 type: string
 *               createdAt:
 *                 type: string
 *       404:
 *         description: Chat not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/messages/:chatRoomId', auth, getMessages);

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Send a message
 *     description: Create a new message in a chat.
 *     parameters:
 *       - in: body
 *         name: body
 *         description: Message details
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             chatRoomId:
 *               type: string
 *             userId:
 *               type: string
 *             content:
 *               type: string
 *     responses:
 *       201:
 *         description: Message sent successfully
 *         schema:
 *           type: object
 *           properties:
 *             _id:
 *               type: string
 *             content:
 *               type: string
 *             user:
 *               type: string
 *             chatRoom:
 *               type: string
 *             createdAt:
 *               type: string
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

router.post('/messages', auth, sendMessageRules, validate, sendMessage);

module.exports = router;
