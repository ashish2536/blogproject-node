const offerModel=require('../models/offer_model');

const add_offer = (req,res)=>{
    return res.render('add_offer')
}

const offerInsertData=async(req,res)=>{
    try{
        await offerModel.create(req.body);
        req.flash('success',"add offer data success");
        return res.redirect("back");
    }catch{
        req.flash('error',"add offer data not insert!!");
        return res.redirect("back");
    }
}

const view_offer =async(req,res)=>{
    const  offerData =await offerModel.find();
    return res.render('view_offer',{
        offerData:offerData
    })
}

module.exports={
   add_offer ,offerInsertData ,view_offer
}