const express = require('express');
const userroutes = express.Router();
const { signup, signin, upload, profile } = require('../controlers/handleuser');

userroutes.get('/signup', signup).post('/signup', upload.single('profilepic'), signup);
userroutes.get('/signin', signin).post('/signin', signin);
userroutes.get('/profile', profile).post('/profile', profile);

module.exports = userroutes;