const User = require('../models/user.model');
const { generateToken, deleteToken } = require('../helpers/jwt.helpers');

exports.register = async (req, res) => {
    try {
        const { username, email, password, imageURL } = req.body;
        const user = new User({ username, email, password, imageURL });
        await user.save();
        const token = await generateToken(user);
        res.status(201).send({ message: 'User registered successfully', token });
    } catch (error) {
        if (error.code === 11000) {
            res.status(400).send({ message: 'Email already exists' });
        } else {
            console.error('Error creating user:', error);
            res.status(500).send({ message: 'Failed to create user' });
        }
        // res.status(400).send(error);
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user || !(await user.comparePassword(password))) {
            return res.status(401).send({ error: 'Invalid email or password' });
        }
        const token = await generateToken(user);
        res.status(201).send({ message: 'User logged in successfully', token });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.logout = async (req, res) => {
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        await deleteToken(token);
        res.send({ message: 'Logged out successfully' });
    } catch (error) {
        res.status(500).send(error);
    }
};
