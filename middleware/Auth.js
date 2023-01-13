const jwt = require('jsonwebtoken');
const asyncHandler = require('./async');
const errorResponse = require('../utils/errorResponse');
const User = require('../schemas/User');
const ErrorResponse = require('../utils/errorResponse');

// Protect routes
exports.protect = asyncHandler(async (req, res, next) => {

    let token;

    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){

        token = req.headers.authorization.split(' ')[1];
    }

    // Can also get token this way
    // else if(req.cookies.token){
    //     token = req.cookies.token;
    // }

    // Make sure token exists
    if(!token){
        return next(new ErrorResponse('Not authorized to access this route', 401));
    }

    try {
        // Verify token ex decoded { id: '63bf3490982cb97c17dd21a3', iat: 1673558385, exp: 1676150385 }
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log(decoded);
        
        // decoded holds the id for User, and that gets passed in to req.user
        req.user = await User.findById(decoded.id); // In any route we use protect, we have access to req.user
                                                    // Which is the user and includes all params
        next();

    } catch (err) {
        return next(new ErrorResponse('Not authorized to access this route', 401));   
    }

});

// Grant access to specific roles
exports.authorize = ( ...roles ) => {
    return(req, res, next) => {
        if(!roles.includes(req.user.role)){
            return next(new ErrorResponse(`User role ${req.user.role} is not authorized to accesss this route`, 403));   
        }

        next();
    }
}