const express = require('express');
const userroutes = express.Router();
const {authenticateUser} = require('../middlewares/validateuser');
const { signup, signin, upload, profile } = require('../controlers/handleuser');

userroutes.get('/signup', signup).post('/signup', upload.single('profilepic'), signup);
userroutes.get('/signin', signin).post('/signin', signin);
userroutes.get('/profile', authenticateUser, profile).post('/profile', authenticateUser, profile);

module.exports = userroutes;