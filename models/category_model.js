const mongoose = require('mongoose');
const multer = require('multer');

const path = require('path');

const categorySchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    },
    current_date: {
        type: String,
        required: true
    }

});

const category = mongoose.model('category', categorySchema)

module.exports = category; 