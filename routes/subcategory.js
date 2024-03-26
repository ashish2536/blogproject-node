const express = require('express');

const routes = express.Router();

const subcategoryctl = require('../controllers/subcategoryctl')

const subcategory_model = require('../models/subcategory_model');

const subcategory = require('../models/subcategory_model');

routes.get('/add_subcategory', subcategoryctl.add_subcategory);
routes.post('/subcategoryInsertData', subcategoryctl.subcategoryInsertData)
routes.get('/view_subcategory', subcategoryctl.view_subcategory);

module.exports = routes;