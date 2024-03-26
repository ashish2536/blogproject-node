const express=require('express');

const routes=express.Router();

routes.use('/admin',require("./admin"))

routes.use('/',require("./user-Panel"))


module.exports= routes