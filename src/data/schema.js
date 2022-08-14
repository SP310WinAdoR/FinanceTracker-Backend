const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    name: {type: String},
    type: {type: String},
    date: {type: Date},
    amount: {type: Number},
    description: {type: String}
});


const financeSchema = new mongoose.Schema({
    month: {type: Number},
    year: {type: Number},
    
    montlyEarnings: {type: Number},
    montlyExpenses: {type: Number},
    balance: {type: Number},
    savings: {type: Number},
    savingTarget: {type: Number}
});

const userSchema = new mongoose.Schema({
    name: {type: String},
    email: {type: String},
    password: {type: String},

    financeInfo: {type: {

        totalEarnings: {type: Number},
        totalExpenses: {type: Number},
        balance: {type: Number},
        savings: {type: Number},
        savingPercent: {type: Number},
    
        earnings: {type: [transactionSchema], default: []},
        expenses: {type: [transactionSchema], default: []},

        history: {type: [financeSchema]}
    } }
});

module.exports = userSchema;