const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const errorHandler = require('./middleware/error');
const colors = require('colors');

dotenv.config({path: './config/config.env'});

// Connection to Database
connectDB();

// App using express framework
const app = express();

// Body Parser
app.use(express.json());

// Grabbing router
const functionalities = require('./routes/functionalities');

// Mounting router
app.use('/api/v1/inventory', functionalities);

// The error middleware needs to be used after routers are called so that it can be used in bootcamps
app.use(errorHandler);

// Running the server
app.listen(3000, () => {

    console.log("listening on port 3000".yellow.underline)

})