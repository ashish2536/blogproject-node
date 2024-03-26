const slider = require('../models/slider-model');
const path = require('path');
const { search } = require('../routes');

// ADD SLIDER
const add_slider = (req, res) => {
    return res.render('add_slider');
}
// ADD SLIDER END

// SLIDER DATA ADD
const sliderInsertData = async (req, res) => {
    try {
        console.log(req.body);
        console.log(req.file);

        var img = "";

        if (req.file) {
            img = slider.sliderimgpath + "/" + req.file.filename;
        }

        req.body.sliderimage = img;
        req.body.status = true;
        // SLIDER DATA ADD
        await slider.create(req.body);

        req.flash('success', "add slider data success");
        return res.redirect("back");
    }
    catch {
        return res.redirect('back');
    }

}
// SLIDER DATA ADD CLOSE


// VIEW SLIDER
const view_slider = async (req, res) => {

    var search = "";

    if (req.query.search) {
        search = req.query.search
    }

    // PAGINATION
    var page = 0;
    var per_page = 2;
    if (req.query.page) {
        page = req.query.page
    }

    let allslider = await slider.find({}).countDocuments();
    let totalpage = Math.ceil(allslider / per_page);

    const sliderData = await slider.find({
        $or: [
            { title: { $regex: search, $options: "i" } },
            { link: { $regex: search, $options: "i" } }
        ]
    })
        .skip(page * per_page) //FOR PAGINATION
        .limit(per_page); //FOR PAGINATION


    return res.render('view_slider', {
        sliderData: sliderData,
        search: search,
        totalpage: totalpage
    });
}
// VIEW SLIDRE DATA CLOSE


// ACTIVE / DEACTIVE

// 1) ACTIVE RECORD
const deactive = async (req, res) => {
    let deactivedata = await slider.findByIdAndUpdate(req.params.id, { status: false });
    if (deactivedata) {
        req.flash("success", "Record Deactiveted");
        return res.redirect('back');
    }
    else {
        return res.redirect('back');
    }
}

// 2) DEACTIVE RECORD
const active = async (req, res) => {
    let activedata = await slider.findByIdAndUpdate(req.params.id, { status: true });
    if (activedata) {
        req.flash("success", "Record Activeted");
        return res.redirect('back');
    }
    else {
        return res.redirect('back');
    }
}

// DELETE ALL RECORD WITH CHEAKBOX
const deleteAllrecord = async (req, res) => {
    const sliderIds = req.body.sliderIds;
    let d = await slider.deleteMany({ _id: { $in: sliderIds } });

    if (d) {
        return res.redirect('back');
    }
    else {
        return res.redirect('back');
    }
}

module.exports = {
    add_slider, sliderInsertData, view_slider, active, deactive, deleteAllrecord
}