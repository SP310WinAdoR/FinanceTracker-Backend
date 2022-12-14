const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema({
    name: {type: String, required: true},
    type: {type: String, required: true},
    date: {type: Date, required: true},
    amount: {type: Number, required: true},
    description: {type: String}
});

const financeSchema = new mongoose.Schema({
    month: {type: Number, required: true},
    year: {type: Number, required: true},
    
    montlyEarnings: {type: Number, default: 0},
    montlyExpenses: {type: Number, default: 0},
    balance: {type: Number, default: 0},
    savings: {type: Number, default: 0},
    savingTarget: {type: Number, default: 0}
});

const creditCardSchema = new mongoose.Schema({
    cardNumber: {type: String, required: true},
    creditorTitle: {type: String, required: true},
    cvv: {type: Number, required: true},
    expirationDate: {type: Date, required: true}
})

const userSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},

    financeInfo: {type: {

        totalEarnings: {type: Number, default: 0},
        totalExpenses: {type: Number, default: 0},
        balance: {type: Number, default: 0},
        savings: {type: Number, default: 0},
        savingPercent: {type: Number, default: 0},
    
        earnings: {type: [transactionSchema], default: []},
        expenses: {type: [transactionSchema], default: []},

        history: {type: [financeSchema], default: []}
    }, default: {}},

    creditCards: {type: [creditCardSchema], default: []}
});

module.exports = userSchema;