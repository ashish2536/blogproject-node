// const mongoose = require('mongoose');
// const multer = require('multer');

// const path = require('path');

// const subcatpath = "/uploads/category";

// const subcategorySchema = mongoose.Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     status: {
//         type: Boolean,
//         required: true
//     },
//     discription: {
//         type: String,
//         required: true
//     },
//     subcatimage: {
//         type: String,
//         required: true
//     }

// });

// const subcategory = mongoose.model('subcategory', subcategorySchema)

// module.exports = subcategory; 
const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const subcatpath = "/uploads/category";

const subcategorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    categoryId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "category",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    subcatimage: {
        type: String,
        required: true
    },
    current_date: {
        type: String,
        required: true,
    }
});

const storagedata = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '..', subcatpath))
    },

    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now())
    }
});

subcategorySchema.statics.subcatimage = multer({ storage: storagedata }).single('subcatimage')

subcategorySchema.statics.postimgpath = subcatpath;


const subcategory = mongoose.model('subcategory', subcategorySchema)

module.exports = subcategory;