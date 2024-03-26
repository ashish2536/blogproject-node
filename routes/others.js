const express=require('express');

const othersCtl=require('../controllers/othersctl')

const routes=express.Router();

routes.get('/add_others',othersCtl.add_others)

routes.post('/othersInsertData',othersCtl.othersInsertData)

routes.get('/view_others',othersCtl.view_others)


module.exports= routes