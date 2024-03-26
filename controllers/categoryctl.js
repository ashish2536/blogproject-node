const category_model = require('../models/category_model');
const subcategory_Model = require('../models/subcategory_model');
const path = require('path');
const moment = require("moment");

// ADD POST
const add_category = (req, res) => {
    return res.render('add_category')
}

const categoryInsertData = async (req, res) => {
    try {
        req.body.status = true;
        req.body.current_date = moment().format('LLL');
        await category_model.create(req.body);
        req.flash('success', 'category data Added')
        return res.redirect('back');
    }
    catch (err) {
        console.log(err)
        return res.redirect('back');
    }
}

// VIEW SLIDER
const view_category = async (req, res) => {

    const catData = await category_model.find();
    return res.render('view_category', {
        catData: catData
    })
}
// VIEW SLIDRE DATA CLOSE

module.exports = {
    add_category, categoryInsertData, view_category
}