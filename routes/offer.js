const express=require('express');

const offerCtl=require('../controllers/offercrl')

const routes=express.Router();

routes.get("/add_offer",offerCtl.add_offer);

routes.post('/offerInsertData',offerCtl.offerInsertData)

routes.get('/view_offer',offerCtl.view_offer)


module.exports= routes