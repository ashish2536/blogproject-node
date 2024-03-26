const mongoose = require('mongoose');
const multer = require('multer');

const path = require('path');

const photospath = "/uploads/photos";

const photosSchema = mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    description:{
        type: String,
        required:true
    },
    photosimage:{
        type:String,
        required:true
    },
   
})

const storagedata = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', photospath))
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

photosSchema.statics.photosimage = multer({ storage: storagedata }).single('photosimage')

photosSchema.statics.photospath = photospath;


const photos=mongoose.model('photo',photosSchema)

module.exports=photos;