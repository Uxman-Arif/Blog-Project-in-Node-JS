const jwt = require('jsonwebtoken');
secret_key = 'dfjkljdkxmnbasheer';

function postuser(user){
    return jwt.sign({
        _id:user._id,
        name:user.name,
        email:user.email,
        role:user.role,
    }, secret_key);
};

function getuser(token){
    if (!token)return res.redirect('/signin');
    return jwt.verify(token, secret_key);
}

module.exports = {
    postuser,
    getuser,
};