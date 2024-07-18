const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controllers');
const auth = require('../middleware/auth.middleware');
const { registerRules, loginRules, validate } = require('../middleware/validateFields');

/**
 * @swagger
 * /register:
 *   post:
 *     summary: Register a new user
 *     description: Creates a new user with the provided information and returns a token.
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User to register
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             email:
 *               type: string
 *             password:
 *               type: string
 *             imageURL:
 *               type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             token:
 *               type: string
 *       400:
 *         description: Bad Request
 */
router.post('/register', registerRules, validate, authController.register);

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Login a user
 *     description: Logs in a user with the provided email and password and returns a token.
 *     parameters:
 *       - in: body
 *         name: body
 *         description: User login credentials
 *         required: true
 *         schema:
 *           type: object
 *           properties:
 *             email:
 *               type: string
 *             password:
 *               type: string
 *     responses:
 *       201:
 *         description: User logged in successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *             token:
 *               type: string
 *       401:
 *         description: Unauthorized
 *       500:
 *         description: Internal Server Error
 */
router.post('/login', loginRules, validate, authController.login);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout a user
 *     description: Logs out a user by invalidating their token.
 *     parameters:
 *       - in: header
 *         name: Authorization
 *         description: Bearer token
 *         required: true
 *         type: string
 *     responses:
 *       200:
 *         description: Logged out successfully
 *         schema:
 *           type: object
 *           properties:
 *             message:
 *               type: string
 *       500:
 *         description: Internal Server Error
 */
router.post('/logout', auth, authController.logout);

module.exports = router;