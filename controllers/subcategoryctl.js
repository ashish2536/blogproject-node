const subcategory = require('../models/subcategory_model');
const category_model = require('../models/category_model');
const path = require('path');
const { search } = require('../routes');

// ADD SLIDER
const add_subcategory = async (req, res) => {
    const subcategoryData = await category_model.find({});
    return res.render('add_subcategory', {
        subcategoryData: subcategoryData
    });
}
// ADD SLIDER END

// SLIDER DATA ADD
const subcategoryInsertData = async (req, res) => {
    try {
        console.log(req.file);
        var img = '';
        if (req.file) {
            img = subcategory.subcatimage + "/" + req.file.filename;
        }
        req.body.status = true;
        req.body.subcatimage = img;
        req.body.current_date = moment().format('LLL');

        // INSERT SUBCATEGORY DATA
        console.log(req.body);
        await subcategory.creae(req.body);
        req.flash('success', 'Subcategory Data Added')
        return res.redirect('back');
    }
    catch (err) {
        console.log(err);
        return res.redirect('back');
    }
}
// SLIDER DATA ADD CLOSE

// VIEW SUBCATEGORY START
const view_subcategory = async (req, res) => {
    return res.render('view_subcategory');
}
// CLOSE    

module.exports = {
    add_subcategory, subcategoryInsertData, view_subcategory
}