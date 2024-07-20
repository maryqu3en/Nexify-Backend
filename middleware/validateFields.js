const { check, validationResult } = require('express-validator');

const registerRules = [
    check('username').not().isEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Must be a valid email address'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('imageURL').optional().isURL().withMessage('Must be a valid URL'),
];

const loginRules = [
    check('email').isEmail().withMessage('Must be a valid email address'),
    check('password').not().isEmpty().withMessage('Password is required'),
];

const createChatRoomRules = [
    check('name').not().isEmpty().withMessage('Chat room name is required'),
    check('userIds').isArray().withMessage('User IDs must be an array').notEmpty().withMessage('At least one user is required'),
    check('userIds.*').isMongoId().withMessage('Each user ID must be a valid MongoDB ID'),
];

const sendMessageRules = [
    check('chatRoomId').isMongoId().withMessage('Chat room ID must be a valid MongoDB ID'),
    check('userId').isMongoId().withMessage('User ID must be a valid MongoDB ID'),
    check('content').not().isEmpty().withMessage('Message content is required'),
];

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    next();
};

module.exports = {
    registerRules,
    loginRules,
    createChatRoomRules,
    sendMessageRules,
    validate,
};
