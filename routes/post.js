const express = require('express');

const postctl = require('../controllers/postctl');

const post = require('../models/post_model');

const routes = express.Router();

const postCtl = require('../controllers/postctl')

const post_model = require('../models/post_model')

routes.get('/add_post', postCtl.add_post)

routes.post('/postsInsertData', post_model.postimage, postCtl.postsInsertData)

routes.get('/view_post', postCtl.view_post);


module.exports = routes