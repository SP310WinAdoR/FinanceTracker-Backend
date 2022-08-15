const createHistoryKey = (historyKey, transactionDate) => {
    let dataSet = {
        year: transactionDate.getFullYear(),
        month: transactionDate.getMonth(),
        
        montlyEarnings: 0,
        montlyExpenses: 0,
        balance: 0,
        savings: 0
    };
    historyKey.push(dataSet);
    return [historyKey, dataSet]; 
}

module.exports = {
    updateEarningEvent: (userItem, transaction) =>{
        const transactionDate = new Date(transaction.date);
        userItem.financeInfo.totalEarnings += transaction.amount;
        userItem.financeInfo.balance += transaction.amount;  

        let historyArray = userItem.financeInfo.history ;
        let match = historyArray.find(elem => {return elem.year == transactionDate.getFullYear() && elem.month == transactionDate.getMonth();});
        
        if (match == undefined)[historyArray, match] = createHistoryKey(historyArray, transactionDate);
        let i = historyArray.indexOf(match);

        match.montlyEarnings += transaction.amount;
        match.balance += transaction.amount;

        if (userItem.financeInfo.savingPercent =! 0){
            let percent = userItem.financeInfo.savingPercent;
            userItem.financeInfo.savings = percent * userItem.financeInfo.balance; 
            match.savings = percent*match.balance;
        }

        userItem.financeInfo.history.splice(i, 1, match);

        return userItem;
    },

    updateExpendEvent: (userItem, transaction) =>{
        const transactionDate = new Date(transaction.date);
        userItem.financeInfo.totalExpenses += transaction.amount;
        userItem.financeInfo.balance -= transaction.amount;  

        let historyArray = userItem.financeInfo.history ;
        let match = historyArray.find(elem => {return elem.year == transactionDate.getFullYear() && elem.month == transactionDate.getMonth();});

        if (match == undefined) [historyArray, match] = createHistoryKey(historyArray, transactionDate);
        let i = historyArray.indexOf(match);

        match.montlyExpenses += transaction.amount;
        match.balance -= transaction.amount;

        if (userItem.financeInfo.savingPercent =! 0){
            let percent = userItem.financeInfo.savingPercent;
            userItem.financeInfo.savings = percent*userItem.financeInfo.balance; 
            match.savings = percent*match.balance;
        }
        userItem.financeInfo.history.splice(i, 1, match);
        
        return userItem;
    }
}