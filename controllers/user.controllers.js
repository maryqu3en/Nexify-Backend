const User = require('../models/user.model');

exports.getUserById = async (req, res) => {
    try {

        // query {
        //     _id: req.params.id,
        //     isDeleted: false}
        // execute
        // fetch
        const user = await User.findById(req.params.id).select('-password');
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send(user);
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.updateUser = async (req, res) => {
    try {
        const updates = req.body;
        if (updates.password) {
            updates.password = await bcryptHelper.hashPassword(updates.password);
        }
        const user = await User.findByIdAndUpdate(req.params.id, updates, { new: true, runValidators: true }).select('-password');
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send({ message: 'User updated successfully', user });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.deleteUser = async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(req.params.id, { isDeleted: true, deletedAt: Date.now() }, { new: true }).select('-password');
        if (!user) {
            return res.status(404).send({ error: 'User not found' });
        }
        res.status(200).send({ message: 'User deleted successfully', user });
    } catch (error) {
        res.status(500).send(error);
    }
};

exports.getAllUsers = async (req, res) => {
    try {
        const users = await User.find({ isDeleted: false }).select('-password');
        res.status(200).send(users);
    } catch (error) {
        res.status(500).send(error);
    }
};
