const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const Token = require('../models/token.model')

const generateToken = async (user) => {
  const payload = {
      id: user._id,
      email: user.email,
  };
  const token = jwt.sign(payload, secret, { expiresIn: '10d' });
  const expiresAt = new Date(Date.now() + 10 * 24 * 3600 * 1000 );

  await Token.create({ token, userId: user._id, expiresAt });
  return token;
};

const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

const deleteToken = async (token) => {
  await Token.findOneAndDelete({ token });
};

module.exports = { generateToken, verifyToken, deleteToken };