const mongoose = require('mongoose');
const { createHmac, randomBytes } = require('crypto');

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
    salt: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
    
}, {timestamps:true})


userSchema.pre('save', function (next) {
    const user = this;
    if(!user.isModified('password'))return;
    const salt = randomBytes(16).toString();
    // const salt = 'thexmnbasheer';
    const hashed_password = createHmac('sha256', salt).update(user.password).digest('hex');
    this.salt = salt;
    this.password = hashed_password;
    next();
});

userSchema.static('matchPassword', async function(email, password) {
    const user = await this.findOne({email});
    if(!user) throw new Error('No account on this email!');
    
    const salt = user.salt;
    const hashedpassword = user.password;
    
    const hashed_password = createHmac('sha256', salt).update(password).digest('hex');
    if(!hashed_password===hashedpassword) throw new Error('Incorrect Password');
    return {...user.toObject(), password:undefined, salt:undefined};
})
const userModel = mongoose.model('blogusers', userSchema);

module.exports = userModel;
