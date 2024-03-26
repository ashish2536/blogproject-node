const mongoose = require('mongoose');
const multer = require('multer');

const path = require('path');

const imgpath = "/uploads/admin";

const adminSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },

    hobby: {
        type: Array,
        required: true
    },
    messages: {
        type: String,
        required: true
    },
    image: {
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
        cb(null, path.join(__dirname, '..', imgpath))
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

adminSchema.statics.uploadimage = multer({ storage: storagedata }).single('image')

adminSchema.statics.ipath = imgpath;


const admin = mongoose.model('admin', adminSchema)

module.exports = admin;