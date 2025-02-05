const multer = require('multer');
const jwt = require('jsonwebtoken');
const {postuser} = require('./usertoken');
const usermodel = require('../models/userstore');


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
        console.log(req.file.filename);
        if (!req.file) {
            return res.status(400).send('No file uploaded!');
        }
        await usermodel.create({name:data.name, email:data.email, role:data.role, profilepic:req.file.filename, password:data.password});
        return res.redirect('/signin');
    }
    return res.render('signup');
};

async function signin(req, res) {
    if (req.method == 'POST'){
        const data = req.body;
        const user = await usermodel.findOne({email:data.email, password:data.password});
        if (user) {
            const setcookie = postuser(user);
            res.cookie('token', setcookie);
            return res.redirect('/');
        }else{
            return res.json({msg:'invalid credentials'});
        }
    }
    return res.render('signin');
};

module.exports = {
    signup,
    signin,
    upload,
}