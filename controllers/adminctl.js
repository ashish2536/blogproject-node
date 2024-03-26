
const admin = require("../models/admim_model")
const path = require('path');
const fs = require('fs');
const slider = require('../models/slider-model');
const passport = require("passport");
const nodemailer = require("nodemailer");
const { Admin } = require("mongodb");


const login = async (req, res) => {


    const captcha_code = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890";

    let captcha = "";

    for (var i = 0; i < 6; i++) {
        captcha += captcha_code.charAt(Math.round(Math.random() * captcha_code.length))
    }

    res.cookie('captcha', captcha)
    return res.render('login', {
        captchaCode: captcha
    })
}


const AdminLoginData = async (req, res) => {
    req.flash('success', "login Successfully");
    console.log(req.body.captcha)

    if (req.cookies.captcha == req.body.captcha) {
        res.clearCookie('captcha');
        return res.redirect('/admin/dashboard')
    }
    else {
        console.log("invalid captcha");
        return res.redirect("/admin");
    }


}

const dashboard = async (req, res) => {
    var adminData = await admin.find().countDocuments();
    var adminActive = await admin.find().countDocuments({ status: true });
    var admindeActive = await admin.find().countDocuments({ status: false });

    // SLIDER ACTIVE RECORD
    var sliderData = await slider.find().countDocuments();
    var sliderActive = await slider.find().countDocuments({ status: true });
    var sliderdeActive = await slider.find().countDocuments({ status: false });

    return res.render('dashboard', {
        adminData: adminData,
        adminActive: adminActive,
        admindeActive: admindeActive,

        sliderData: sliderData,
        sliderActive: sliderActive,
        sliderdeActive: sliderdeActive
    })
}

const addAdmin = async (req, res) => {
    return res.render('add_admin')
}

const viewAdmin = async (req, res) => {

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

    let allrecord = await admin.find({}).countDocuments();
    let totalpage = Math.ceil(allrecord / per_page);

    var viewData = await admin.find({
        $or: [
            { name: { $regex: search, $options: "i" } },
            { email: { $regex: search, $options: "i" } }
        ]
    })
        .skip(page * per_page) //FOR PAGINATION
        .limit(per_page); //FOR PAGINATION

    return res.render('view_admin', {
        viewData: viewData,
        search: search,
        totalpage: totalpage
    })
}

const adminInsertData = async (req, res) => {
    console.log(req.file);
    var img = "";
    if (req.file) {
        img = admin.ipath + "/" + req.file.filename;
    }

    req.body.image = img;
    req.body.status = true;
    req.body.name = req.body.fname + " " + req.body.lname;

    console.log(req.body);

    await admin.create(req.body);
    req.flash('success', "add data success");
    return res.redirect("back");

}

const deleteAdminRecord = async (req, res) => {
    const deteleAdmin = await admin.findById(req.params.id);

    if (deteleAdmin) {
        var ipath = path.join(__dirname, '..', deteleAdmin.image)
        await fs.unlinkSync(ipath);
    }

    await admin.findByIdAndDelete(req.params.id);
    req.flash('success', 'delete data successfully');
    req.flash('error', 'not delete data!!');
    return res.redirect('back');
}

const updateAdminRecord = async (req, res) => {
    let updatedata = await admin.findById(req.query.id);
    return res.render('update_Admin', {
        admindata: updatedata
    })
}

const adminEditData = async (req, res) => {
    const editData = await admin.findById(req.body.id);
    if (req.file) {
        if (editData) {
            var ipath = path.join(__dirname, '..', editData.image);
            try {
                await fs.unlinkSync(ipath);

            }
            catch (err) {
                console.log(err);
            }
        }

        req.body.image = admin.ipath + "/" + req.file.filename;

    }
    else {
        const editData = await admin.findById(req.body.id);
        if (editData) {
            req.body.image = editData.image;
        }
    }


    req.body.name = req.body.fname + " " + req.body.lname;
    await admin.findByIdAndUpdate(req.body.id, req.body);
    console.log(req.body.id, req.body)
    console.log(req.body.name);
    req.flash('success', 'update data successfully')

    return res.redirect("/admin/view_admin")
}

const profile = async (req, res) => {

    return res.render('profile')
}

const ChangePassword = async (req, res) => {
    return res.render('ChangePassword')
}

const AdminChangePassword = async (req, res) => {

    var dbpass = req.user.password
    if (dbpass == req.body.current_password) {
        if (req.body.current_password != req.body.new_password) {
            if (req.body.new_password == req.body.conform_password) {
                await admin.findByIdAndUpdate(req.user._id, {
                    password: req.body.new_password
                })
                return res.redirect('/admin/logout');
            }
            else {
                console.log(" Password no update");
                return res.redirect('/admin');
            }

        }
        else {
            console.log("New Password and Confirm Password are same");
            return res.redirect('/admin');
        }
    }
    else {
        console.log("dbpassword and current password not match");
        return res.redirect('/admin');
    }

}

const ForgetPassWord = async (req, res) => {
    return res.render('ForgottenPassword');
}

const ForgottenPasswordForm = async (req, res) => {

    const checkEmail = await admin.findOne({ email: req.body.email })
    if (checkEmail) {
        const transporter = nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 465,
            secure: true,
            auth: {
                // TODO: replace `user` and `pass` values from <https://forwardemail.net>
                user: "asodariyashyam555@gmail.com",
                pass: "faziibbmovatlyqg",
            },
        });

        const otp = Math.round(Math.random() * 1000000)
        res.cookie('otp', otp)
        res.cookie('email', req.body.email)

        const msg = `<h1>shyam Institute</h1><b>OTP : ${otp}</b><br><a href="http://localhost:8010/admin/olginforgottenpass">forgotten password</a>`

        const info = await transporter.sendMail({
            from: 'asodariyashyam555@gmail.com', // sender address
            to: req.body.email, // list of receivers
            subject: "Your OTP is here ✔", // Subject line
            text: "Hello world?", // plain text body
            html: msg, // html body
        });

        return res.redirect("/admin/VerifyOTP")

    }
    else {
        console.log("invalid email")
        return res.redirect('back')
    }

}

const VerifyOtp = (req, res) => {
    return res.render("VerifyOTP")
}

const verifyOtpForm = async (req, res) => {
    if (req.body.otp == req.cookies.otp) {
        res.clearCookie('otp')
        return res.redirect('/admin/olginforgottenpass')

    }
    else {
        console.log("OTP not verify");
    }
}

const olginforgottenpass = async (req, res) => {
    return res.render('olginforgottenpass')
}

const loginEditPassword = async (req, res) => {
    console.log(req.body);
    console.log(req.cookies.email);

    if (req.body.npass == req.body.cpass) {

        var email = req.cookies.email;
        const checkEmail = await admin.findOne({ email: email });

        if (checkEmail) {
            let changepass = await admin.findByIdAndUpdate(checkEmail.id, {
                password: req.body.npass
            })

            if (changepass) {
                res.clearCookie("email")
                return res.redirect('/admin');
            }
            else {
                console.log("password not changed")
                return res.redirect('back');
            }
        }
        else {
            return res.redirect('back');
        }
    }
    else {
        console.log("invalid email")
        return res.redirect('back');
    }

}

// ACTIVE / DEACTIVE

// 1) ACTIVE RECORD
const deactive = async (req, res) => {
    let deactivedata = await admin.findByIdAndUpdate(req.params.id, { status: false });
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
    let activedata = await admin.findByIdAndUpdate(req.params.id, { status: true });
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
    const adminIds = req.body.adminIds;
    let d = await admin.deleteMany({ _id: { $in: adminIds } });

    if (d) {
        return res.redirect('back');
    }
    else {
        return res.redirect('back');
    }
}


module.exports = {
    dashboard, addAdmin, viewAdmin, adminInsertData,
    deleteAdminRecord, updateAdminRecord, adminEditData, login,
    AdminLoginData, profile, ChangePassword, AdminChangePassword,
    ForgetPassWord, ForgottenPasswordForm, VerifyOtp, verifyOtpForm,
    olginforgottenpass, loginEditPassword, active, deactive, deleteAllrecord
}