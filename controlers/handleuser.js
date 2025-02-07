const multer = require('multer');
const jwt = require('jsonwebtoken');
const { blogModel, commentModel } = require('../models/Blogmodel');
const {postuser} = require('./usertoken');
const userModel = require('../models/userstore');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});

const upload = multer({ storage: storage });


async function signup(req, res) {
    if (req.method == 'POST'){
        const data = req.body;
        if (!req.file) {
            return res.status(400).send('No file uploaded!');
        }
        await userModel.create({name:data.name, email:data.email, role:data.role, profilepic:req.file.filename, password:data.password});
        return res.redirect('/user/signin');
    }
    return res.render('signup');
};

async function signin(req, res) {
    if (req.method == 'POST'){
        const data = req.body;
        const user = await userModel.findOne({email:data.email});
        if (user) {
            const setcookie = postuser(user);
            res.cookie('token', setcookie);
            const check_user = userModel.matchPassword(data.email, data.password);
            return res.redirect('/home');
        }else{
            return res.json({msg:'invalid credentials'});
        }
    }
    return res.render('signin');
};


async function profile(req, res) {
    console.log(req.user._id);
    const blogs = await blogModel.find({owner: req.user._id}); 
    console.log(blogs);
    return res.render('profile', {user:req.user});
}
module.exports = {
    signup,
    signin,
    upload,
    profile,
}