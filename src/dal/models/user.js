import mongoose from 'mongoose';
import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import { SECRET } from '../config/config';

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    joinedDate: {
        type: Date,
        required: true,
        default: Date.now()
    },
    salt: {
        type: String,
        required: true
    },
    hash: {
        type: String,
        required: true
    }
});

function getAccessToken() {
    const expiresIn = Math.floor(Date.now() + (60 * 60 * 5000)); // 5 hours
    const accessToken = jwt.sign({
        _id: this._id,
        username: this.username,
        name: this.name,
        exp: expiresIn
    }, SECRET);

    return {
        accessToken,
        expiresIn
    };
}

// These functions cannot be converted to arrow functions since the 'this' environment matters
userSchema.methods.setPassword = function setPassword(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
};

userSchema.methods.validPassword = function validPassword(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64, 'sha512').toString('hex');
    return this.hash === hash;
};

userSchema.methods.generateJwt = async function generateJwt() {
    const { accessToken, expiresIn } = getAccessToken.call(this);
    return {
        accessToken,
        expiresIn
    };
};

const UserModel = mongoose.model('User', userSchema);

export default UserModel;
