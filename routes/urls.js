const express = require('express');
const routes = express.Router();
const views = require('../controlers/views');

routes.get('/', views.index);
routes.get('/create', views.index).post('/create', views.index);
module.exports = routes;