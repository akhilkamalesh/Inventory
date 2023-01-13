const mongoose  = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add name']
    },
    email: {
        type: String,
        required: [true, 'Please add an email'],
        unique: true,
        match: [
           /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
           'Please add a valid email'
        ]
     },
     role: {
        type: String,
        enum: ['user'],
        default: 'user'
     },
     password: {
        type: String,
        required: [true, 'Please add a password'],
        minlength: 6,
        select: false // When we get user through api, it will not show the password
     },
     resetPasswordToken: String,
     resetPasswordToken: Date,
     createdAt: {
        type: Date,
        default: Date.now
     }
});

// Encrypt password using bcrypt
UserSchema.pre('save', async function(next){
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt); // hash password with salt
});

//  Sign JWT and return
UserSchema.methods.getSignedJwtToken = function(){
    // payload, secret, options such as expiry
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE
    });
};

// Match user entered password to hashed password in database
UserSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password);
}

module.exports = mongoose.model('user', UserSchema);