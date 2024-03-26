const express=require('express');

const photosClt=require('../controllers/photosctl');

const photos_model=require('../models/photos_model')

const routes=express.Router();

routes.get('/add_photos',photosClt.add_photos)

routes.post("/photosInsertData",photos_model.photosimage,photosClt.photosInsertData)

routes.get('/view_photos',photosClt.view_photos);


module.exports= routes