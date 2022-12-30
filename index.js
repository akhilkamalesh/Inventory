const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');

dotenv.config({path: './config/config.env'});

connectDB();

const app = express();

app.use(express.json());

const functionalities = require('./routes/functionalities');


app.use('/api/v1/inventory', functionalities);

app.listen(3000, () => {

    console.log("listening on port 3000")

})