const sliderModel = require('../models/slider-model')

const others_model = require('../models/others_model')

const offer_model = require('../models/offer_model')

const photos_model = require('../models/photos_model')

const post_model = require('../models/post_model');

const admim_model = require('../models/admim_model');

const path = require('path');

const home = async (req, res) => {
    const sliderData = await sliderModel.find();
    const othersData = await others_model.find();
    const offerData = await offer_model.find();
    const photosData = await photos_model.find();
    const postData = await post_model.find();

    return res.render('user-panel/home', {
        sliderData: sliderData,
        othersData: othersData,
        offerData: offerData,
        photosData: photosData,
        postData: postData
    })
}

const blogsingle = async (req, res) => {
    let blogData = await post_model.findById(req.params.id);
    // NEXT/PREV START
    let Ids = [];
    let current;
    let allIds = await post_model.find({}).select('_Ids');
    allIds.map((v, i) => {
        if (v._id == req.params.id) {
            current = i;
        }
    })
    // NEXT / PREV END

    let recent = await post_model.find({}).sort({ _id: -1 }).limit(3);

    console.log(recent);
    return res.render('user-Panel/blog_single',
        {
            blogData: blogData,
            allIds: allIds,
            pos: current,
            recent
        })
}

const about = async (req, res) => {
    const adminData = await admim_model.find();
    return res.render('user-Panel/about', {
        adminData: adminData
    });
}

const workThreeColumn = async (req, res) => {
    return res.render('user-panel/work-three-column')
}

module.exports = { home, blogsingle, about, workThreeColumn }