const ErrorResponse = require('../utils/ErrorResponse');
const User = require('../schemas/User');
const asyncHandler = require('../middleware/async');

// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public

exports.register = asyncHandler(async(req, res, next) => {

    // Grabbing the attributes from req.body
    const {name, email, password, role} = req.body;

    const user = await User.create({
        name,
        email,
        password,
        role
    });

    sendTokenResponse(user, 200, res);

});

// @desc    Login user
// @route   POST /api/v1/auth/login
// @access  Public
exports.login = asyncHandler(async (req, res, next) => {
    // Pulling this from the body
    const { email, password } = req.body

    // Validate email and password
    if(!email || !password){
        return next(new ErrorResponse('Please provide an email and password', 400))
    }

    // Check for user
    const user = await User.findOne({email: email}).select('+password'); // Since password is hidden, need select +password to retrieve to check

    // If user is not found
    if(!user){
        return next(new ErrorResponse('Invalid Credentials', 401));
    }

    // Check if password matches by using the matchPassword method in the model
    const isMatch = await user.matchPassword(password);

    if(!isMatch){
        return next(new ErrorResponse('Invalid Credentials', 401));
    }

    sendTokenResponse(user, 200, res);
});

// @desc    Gets user
// @route   POST /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) => {
    const user = await User.findById(req.user.id);

    res.status(200).json({
        success: true,
        data: user
    });
});


// Grabs token as well as returns a response
const sendTokenResponse = (user, statusCode, res) => {
    // Create token
    const token = user.getSignedJwtToken();

    const options = {
        expires: new Date(Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000),
        httpOnly: true
    };

    // Implement production environment
    if(process.env.NODE_ENV === 'production'){
        options.secure = true;
    }

    // Sets cookie to be the token with added options
    res.status(statusCode).cookie('token', token, options).json({
        success: true, 
        token
    });
};