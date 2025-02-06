const {getuser} = require('../controlers/usertoken');

function authenticateUser(req, res, next) {
    const token = req.cookies.token;
    const user = getuser(token);
    if (!user){
        return res.json({msg:'Not Verified!'});
    };
    req.user = user;
    next();
};

function authorizeUser(roles = []){
    return function(req, res, next){
        if (!req.user) {
            return res.redirect('/signin');
        };
        if (!roles.includes(req.user.role)) {
            return res.json({msg:'Unauthorized'});
        };
        next();
    };
};
module.exports = {
    authenticateUser,
    authorizeUser,
};