/*
    Custom error response that has message and statusCode
*/

class ErrorResponse extends Error {
    constructor(message, statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

module.exports = ErrorResponse;