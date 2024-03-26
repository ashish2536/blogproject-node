const mongoose=require('mongoose')

mongoose.connect("mongodb://127.0.0.1/adminPenal-blog")

const db=mongoose.connection.once("open",(err)=>{
    if(err) {
        console.log("db ok")
        return false
    }
    console.log("ok")
})

module.exports=db;