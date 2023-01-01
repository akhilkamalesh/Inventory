const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const colors = require('colors');

dotenv.config({path: './config/config.env'});

connectDB();

const app = express();

// Body Parser
app.use(express.json());

// Grabbing router
const functionalities = require('./routes/functionalities');

// Mounting router
app.use('/api/v1/inventory', functionalities);

// Running the server
app.listen(3000, () => {

    console.log("listening on port 3000")

})