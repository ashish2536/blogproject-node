const mongoose = require('mongoose');

const othersSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    
    description:{
        type: String,
        required:true   
    },
    city:{
        type: String,
        required:true
    },
    country:{
        type:String,
        required:true
    },
   
})


const others=mongoose.model('others',othersSchema)

module.exports=others;