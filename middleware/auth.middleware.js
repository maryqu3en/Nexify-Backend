const { verifyToken } = require('../helpers/jwt.helpers');
const User = require('../models/user.model');
const Token = require('../models/token.model');

const auth = async (req, res, next) => {
    const authHeader = req.header('Authorization');
    if (!authHeader) {
        return res.status(401).send({ error: 'No token provided' });
    }
    
    if (!authHeader.startsWith('Bearer ')) {
        return res.status(401).send({ error: 'Invalid token format' });
    }
    
    const token = authHeader.replace('Bearer ', '');
    try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.id);
        const tokenRecord = await Token.findOne({ token });

        if (!user || !tokenRecord) {
            return res.status(401).send({ error: 'Invalid token' });
        }

        req.user = user;
        next();
    } catch (error) {
        res.status(401).send({ error: 'Invalid token' });
    }
};

module.exports = auth;