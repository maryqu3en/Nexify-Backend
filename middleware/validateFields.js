const { check, validationResult } = require('express-validator');

const registerRules = [
    check('username').not().isEmpty().withMessage('Username is required'),
    check('email').isEmail().withMessage('Must be a valid email address'),
    check('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
];

const loginRules = [
    check('email').isEmail().withMessage('Must be a valid email address'),
    check('password').not().isEmpty().withMessage('Password is required'),
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
    validate,
};