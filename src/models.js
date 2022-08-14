const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    name: {type: String},
    transactionType: {type: String},
    category: {type: String},
    value: {type: Number}
});

const financeSchema = new mongoose.Schema({
    month: {type: String},
    year: {type: String},

    totalEarnings: {type: Number},
    totalExpenses: {type: Number},
    balance: {type: Number},
    transactions: {type: [transactionSchema]}

});

const userSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},

    financeInfo: {type: [financeSchema]},
});

const User = mongoose.model('User', userSchema, 'users');
module.exports = User;