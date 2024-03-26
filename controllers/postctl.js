const post_model = require('../models/post_model');
const path = require('path');
const moment = require("moment");
const { search } = require('../routes');
const { error } = require('console');

// ADD POST
const add_post = (req, res) => {
    return res.render('add_post')
}
// ADD POST CLOSE


// ADD POST DATA START
const postsInsertData = async (req, res) => {

    try {
        var img = "";

        if (req.file) {
            img = post_model.postimgpath + "/" + req.file.filename;
        }

        req.body.postimage = img;
        req.body.username = req.user.name;
        req.body.current_date = moment().format('lll');

        let xyz = await post_model.create(req.body);
        console.log(xyz);
        req.flash('success', "add post data success");
        return res.redirect("back");
    }
    catch (err) {
        console.log(err)
        return res.redirect('back');
    }

}
// ADD DATA POST CLOSE


// VIEW POST START
const view_post = async (req, res) => {

    var search = " ";

    if (req.query.search) {
        search = req.query.search
    }

    // PAGINATION
    var page = 0;
    var per_page = 20;
    if (req.query.page) {
        page = req.query.page
    }

    let allpost = await post_model.find({}).countDocuments();
    let totalpage = Math.ceil(allpost / per_page);

    const postData = await post_model.find({
        $or: [
            { title: { $regex: search, $options: "i" } },
            { link: { $regex: search, $options: "i" } }
        ]
    })
        .skip(page * per_page) //FOR PAGINATION
        .limit(per_page); //FOR PAGINATION


    return res.render('view_post', {
        postData: postData,
        search: search,
        totalpage: totalpage
    });
}
// VIEW POST CLOSE

module.exports = {
    add_post, postsInsertData, view_post
}