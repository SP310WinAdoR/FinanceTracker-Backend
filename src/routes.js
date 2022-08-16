const express = require('express');
const userModel = require('./data/models');
const event = require('./user_control');
const app = express();

app.get('/auth' , async (req, res) => {
    try {
        const user = await userModel.findOne({email: req.query.email}).exec();
        if (user == null)  throw 'User not found';
        res.status(200).send(user.toJSON());
    } catch (error) {
        res.status(404).send(error);
    }
});

app.get('/user/:userID/profile/creditCards', async (req, res) => {
    try{
        const user = await userModel.findById({_id: req.params.userID}).exec();
        if (user == null)  throw 'Card not found';

        res.status(200).send(user.creditCards.toJSON());
    } catch (error) {
        res.status(404).send(error);
    }
});

app.get('/user/:userID/transactions/:typeTransaction'/* + ?date=StringDate if it exist*/, async (req, res) => {
    try{
        const user = await userModel.findById({_id: req.params.userID}).exec();
        if (user == null)  throw 'User not found';
        let dateFilter = !(req.query.date == undefined) ? new Date(req.query.date) : null; 
        let userTransactionsArray = event.getTransactionsEvent(user.financeInfo[req.params.typeTransaction], dateFilter);
        res.status(200).send(userTransactionsArray);
    } catch (error) {
        res.status(400).send(error);
    }

})

app.post('/add_user', async (req, res) => {
    try { 
        let user = await userModel.findMany({email: req.query.email}).exec();
        if (user =! null) throw 'Email already registered';
        user = new userModel(req.body);
        await user.save();
        res.status(201).send(user.toJSON());
    } catch (error) {
        res.status(500).send(error);
    }
});

app.post('/user/:userId/transactions/:typeTransaction/', async (req, res) => {
    try {
        let user = await userModel.findById(req.params.userId).exec();
        if (user == null)  throw 'User not found' ;

        if (req.params.typeTransaction === 'earnings'){
            const earningsArray = user.financeInfo.earnings;
            earningsArray.push(req.body);
            user.financeInfo.earnings = earningsArray
            user = event.updateEarningEvent(user, req.body);
            
        } else if(req.params.typeTransaction === 'expenses'){
            const expensesArray = user.financeInfo.expenses;
            expensesArray.push(req.body);
            user.financeInfo.expenses = expensesArray
            user = event.updateExpendEvent(user, req.body);
        }
        await user.save();
        res.status(200).send(user.toJSON());

    }catch (error) {
        res.status(500).send(error);
    }

    app.post('/user/:userId/profile/creditCards'), async () => {
        try {
            const user = await userModel.findById(req.params.userId);
            user.creditCards.push(req.body);
            await user.save();
            res.status(200).send(user);
        } catch (error) {
            res.status(500).send(error);
        }


    }
});

module.exports = app;