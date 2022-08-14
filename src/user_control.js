module.exports = {
    updateEarningEvent: (userItem, transaction) =>{
        userItem.financeInfo.totalEarnings += transaction.amount;
        userItem.financeInfo.balance += transaction.amount;  

        const historyArray = userItem.financeInfo.history ;
        const match = historyArray.find(elem => {elem.year == transaction.date.getYear() && elem.month == transaction.date.getMonth();});

        match.montlyEarnings += transaction.amount;
        match.balance += transaction.amount;

        if (userItem.financeInfo.savingPercent =! null){
            let percent = userItem.financeInfo.savingPercent;
            userItem.financeInfo.savings = percent*userItem.financeInfo.balance; 
            match.savings = percent*match.balance;
        }

        userItem.financeInfo.history.push(match);

        return userItem;
    },

    updateExpendEvent: (userItem, transaction) =>{
        userItem.financeInfo.totalExpenses += transaction.amount;
        userItem.financeInfo.balance -= transaction.amount;  

        const historyArray = userItem.financeInfo.history ;
        const match = historyArray.find(elem => {elem.year == transaction.date.getYear() && elem.month == transaction.date.getMonth();});

        match.montlyExpenses += transaction.amount;
        match.balance -= transaction.amount;

        if (userItem.financeInfo.savingPercent =! null){
            let percent = userItem.financeInfo.savingPercent;
            userItem.financeInfo.savings = percent*userItem.financeInfo.balance; 
            match.savings = percent*match.balance;
        }

        userItem.financeInfo.history.push(match);

        return userItem;
    }
};