const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const postpath = "/uploads/post";

const postSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    postimage: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true
    },
    current_date: {
        type: String,
        required: true,
    }
})

const storagedata = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', postpath))
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
})

postSchema.statics.postimage = multer({ storage: storagedata }).single('postimage')

postSchema.statics.postimgpath = postpath;


const post = mongoose.model('post', postSchema)

module.exports = post;