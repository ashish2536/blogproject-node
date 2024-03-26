const others= require('../models/others_model');


const path = require('path');

const add_others = (req,res)=>{
    return res.render('others')
}

const othersInsertData= async(req,res) =>{
    try {
        await others.create(req.body);
    
        return res.redirect('back') 
        
    } catch (error) {
        console.log(error)
        return res.redirect('back') 
    }

}

const view_others=async (req,res)=> {

    var othersData=await others.find();
    return res.render('others-view',{
        othersData : othersData
    })

}

module.exports={
    add_others , othersInsertData ,view_others
}