const mongoose = require('mongoose');
const userModel = require('./schema.js');

const User = new mongoose.model('User', userModel);
module.exports = User;