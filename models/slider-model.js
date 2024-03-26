const mongoose = require('mongoose');
const multer = require('multer');

const path = require('path');

const sliderpath = "/uploads/slider";

const sliderSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },

    link: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    sliderimage: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }

})

const storagedata = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', sliderpath))
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

sliderSchema.statics.sliderimage = multer({ storage: storagedata }).single('sliderimage')

sliderSchema.statics.sliderimgpath = sliderpath;


const admin = mongoose.model('slider', sliderSchema)

module.exports = admin;