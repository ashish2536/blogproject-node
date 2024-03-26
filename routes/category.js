const express = require('express');

const routes = express.Router();

const categoryctl = require('../controllers/categoryctl')

const category_model = require('../models/category_model')

routes.get('/add_category', categoryctl.add_category);

routes.post('/categoryInsertData', categoryctl.categoryInsertData);

routes.get('/view_category', categoryctl.view_category);

module.exports = routes;