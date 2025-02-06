const express = require('express');
const mongoose = require('mongoose');
const cookieparser = require('cookie-parser');
const path = require('path');
const {authenticateUser} = require('./middlewares/validateuser');
const routes = require('./routes/urls');
const userroutes = require('./routes/userurl');

const app = express();
app.use(cookieparser());
mongoose.connect('mongodb://127.0.0.1:27017/BlogProject');
app.set('view engine', 'ejs');
app.set('views', path.resolve('./views'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use('/', authenticateUser, routes);
app.use('/user', userroutes);

app.listen(8000, ()=>console.log('Running Successfully!'))