# FinanceTracker Backend
___
This API was made in javascript and uses Express.js and mongoose frameworks, please install them before use. The database is hosted by MongoDB Atlas.

### Data sctructure

This data structure, based on mongoose schemas, returns all data required from the database via Express Endpoints, and saves the data in one dictionary per user.

###### Structure format

The structure format is:
>```lang-json
>{
>   __id: ObjectId() //A unique identificator autogenerated
>   name: "user",
>   email: "user@example.com",
>   password: "password",
> 
>   financeInfo: {
>       totalEarnings: 100,
>       totalExpenses: 50,
>       balance: 50, //The balance is the diference between earnings and expenses
>       savings: 20 
>       savingPercent: 0.2 //The multiplier of the total saving
>
>       //Earnings and expenses are a transactions array
>       earnings: [Transactions],
>       expenses: [Transactions],
>
>       //Then, the history is an array of other dictionary
>       history:[montlyFinanceInfo]
>   }
>   creditCards:[creditCard]
>   //The creditCard dictionaries contains the classic credit card credentials
>}
>```

The transactions structure defines by
>```lang-json
>{
>   name: "Transaction Name",
>   type: "Trasaction Category",
>   date: "01/01/2031", //Important: Into mongoose, this is a date object
>   amount: 30 //The transaction value
>   decription: "A short description of the transaction (Optional)"
> }

the montlyFinanceInfo structure defines by
>```lang-json
>{
>   month: 0 //Number between 0 and 11, 0 = january, 2 = february, 11 = december...
>   year: 2031,
>   montlyEarnings: 100,
>   montlyExpenses: 50
>   balance: 50,
>   savings: 20,
>   savingTarget: 15 //This is a goal to save
> }


The credit card structure defines by
>```lang-json
>{
>   cardNumber: "xxxx-xxxx-xxxx"
>   name: "User Holder",
>   cvv: 123,
>   expirationDate: "01/01/2031" //Important: Into mongoose, this is a date object
>}

### Endpoints
This API defined various endpoints to access, write and read the data with Express.js endpoints.

###### /auth
- Method: get
- Query values: The user email
- Return if sucess: The user json
Must validate the existency of a user in login

###### /user/userID/profile/creditCards
- Method: get
- Query values: None
- Return if sucess: An array of credit card structures

###### /user/\$userID/transactions/\$transactionType
- Method: get
- Query values: ```date = DateObject```
- Params values: ```$userID = __id, $transactionType = 'earnings' or 'expenses'``` 
- Return if sucess: A transactions structure array
A method than returns all transactions of a determinate day

###### /add_user
- Method: post
- Body values: A data like ```{name: "User Name", email: "user@example.com", password: "password"}```
- Return if sucess: A new User structure

###### /user/\$userID/transactions/\$typeTransaction
- Method: post
- Body values: A transaction structure json
- Params values: ```$userID = __id, $transactionType = 'earnings' or 'expenses'``` 
- Return if sucess: A updated user json
  This method registers a new transaction and update all user data

###### /user/\$userID/profile/creditCards
- Method: post
- Body values: A credit card structure json
- Params values: ```$userID = __id```
- Return if sucess: A updated user json
