const express = require('express');
const routes = express.Router();
const views = require('../controlers/views');

routes.get('/', views.index);
routes.get('/create', views.createBlog).post('/create', views.uploads.single('blogpic'), views.createBlog);
routes.get('/blog/:id', views.blogDetail).post('/blog/:id', views.blogDetail);
module.exports = routes;