const mongoose = require('mongoose');
const userSchema = require('./schema.js');
const userModel = require('./schema.js');

const User = new mongoose.model('User', userModel);
module.exports = User;