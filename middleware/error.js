// errorHandler is middleware that handles error from any of the request coming from functionalities.js
// Handles 3 mongoose errors
// Used as middleware in index.js

const ErrorResponse = require('../utils/ErrorResponse');

const errorHandler = (err, req, res, next) => {

    let error = { ...err }; // Grabbing properties of err using spread

    error.message = err.message;

    // console.log(err);

    // Mongoose bad ObjectID
    if(err.name === 'CastError'){
        const message = `Inventory not found with id of ${err.value}`;
        error = new ErrorResponse(message, 404);
    }

    // Mongoose duplicate key
    if(err.code === 11000){
        const message = 'Duplicate field value entered';
        error = new ErrorResponse(message, 400);
    }

    // Mongoose validation error (for create)
    if(err.name === 'ValidationError'){
        const message = Object.values(err.errors).map(v => v.message); // Grabs the errors from err and grabs the message from it
        error = new ErrorResponse(message, 400);
    }
        
    // Sends status codes
    res.status(error.statusCode || 500).json({
        success: false,
        error: error.message || 'server error'
    });

}

module.exports = errorHandler;