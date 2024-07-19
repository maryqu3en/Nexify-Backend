const mongoose = require('mongoose');
const bcryptHelper = require('../helpers/bcrypt.helpers');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    imageURL: {
        type: String,
        default: 'https://www.pinterest.com/pin/star-instagram-pfp-default--318700111146556309/'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    },
    deletedAt: {
        type: Date
    },
    isDeleted: {
        type: Boolean,
        default: false
    }
});

UserSchema.pre('save', async function (next) {
    const user = this;
  if (!user.isModified('password')) return next();
  try {
    user.password = await bcryptHelper.hashPassword(user.password);
    next();
  } catch (err) {
    next(err);
  }
});

UserSchema.methods.comparePassword = function (candidatePassword) {
    return bcryptHelper.comparePassword(candidatePassword, this.password);
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
