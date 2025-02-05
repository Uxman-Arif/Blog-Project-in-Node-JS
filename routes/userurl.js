const express = require('express');
const userroutes = express.Router();
const { signup, signin, upload } = require('../controlers/handleuser');

userroutes.get('/signup', signup).post('/signup', upload.single('profilepic'), signup);
userroutes.get('/signin', signin).post('/signin', signin);

module.exports = userroutes;