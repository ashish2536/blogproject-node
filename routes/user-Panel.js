const express = require('express');

const routes = express.Router();

const userPanel = require('../controllers/user-panelctl')

routes.get('/', userPanel.home);
routes.get('/blogsingle/:id', userPanel.blogsingle);

routes.get('/work-three-column', userPanel.workThreeColumn);

routes.get('/about', userPanel.about);
module.exports = routes;