const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    role: {
        type: String,
        required: true,
    },
    profilepic: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    
}, {timestamps:true})

const userModel = mongoose.model('blogusers', userSchema);

module.exports = userModel;
