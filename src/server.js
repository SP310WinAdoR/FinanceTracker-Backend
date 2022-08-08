const express = require('express');
const mongoose = require('mongoose');
const app = express();
const Router = require('./routes');
app.use(express.json());

const config = {
    port: 8000,
    username: 'admin',
    password: 'admin',
    cluster: 'cluster0.28n6ded',
    database: 'sample_airbnb',
};

mongoose.connect(`mongodb+srv://${config.username}:${config.password}@${config.cluster}.mongodb.net/${config.database}?retryWrites=true&w=majority`);


const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {console.log("Connected successfully");} );

app.use(Router);
app.listen(config.port);