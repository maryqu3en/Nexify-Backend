const express = require('express');
const router = express.Router();
const userController = require('../controllers/user.controllers');
const auth = require('../middleware/auth.middleware');


/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     summary: Get user profile
 *     description: Retrieve user profile information by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User profile retrieved successfully
 *         schema:
 *           type: object
 *           properties:
 *             username:
 *               type: string
 *             email:
 *               type: string
 *             imageURL:
 *               type: string
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

router.get('/users/:id', auth, userController.getUserById);

/**
 * @swagger
 * /api/users/{id}:
 *   put:
 *     summary: Update user profile
 *     description: Update user profile information.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: body
 *         description: User profile data
 *         required: true
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 imageURL:
 *                   type: string
 *     responses:
 *       200:
 *         description: User profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 imageURL:
 *                   type: string
 *       400:
 *         description: Bad Request
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal Server Error
 */

router.put('/users/:id', auth, userController.updateUser);

router.delete('/users/:id', auth, userController.deleteUser);

router.get('/users', auth, userController.getAllUsers);

module.exports = router;
