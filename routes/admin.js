const express = require('express');
const adminCtl = require('../controllers/adminctl')

const admin = require("../models/admim_model")

const passport = require('passport');
const { route } = require('./slider');

const routes = express.Router();

routes.get('/', adminCtl.login)

routes.post('/AdminLoginData', passport.authenticate('local', { failureRedirect: '/admin/' }), adminCtl.AdminLoginData)

routes.get('/dashboard', passport.checkAdmin, adminCtl.dashboard)

routes.get('/add_admin', passport.checkAdmin, adminCtl.addAdmin)

routes.get('/view_admin', passport.checkAdmin, adminCtl.viewAdmin)

routes.post('/adminInsertData', admin.uploadimage, adminCtl.adminInsertData)

routes.get('/deleteAdminRecord/:id', adminCtl.deleteAdminRecord)

routes.get('/updateAdminRecord', passport.checkAdmin, adminCtl.updateAdminRecord)

routes.post('/adminEditData', admin.uploadimage, adminCtl.adminEditData)

routes.get('/profile', passport.checkAdmin, adminCtl.profile)

routes.get('/logout', (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
            return res.redirect('/dashboard')
        }
        else {
            return res.redirect('/admin')

        }
    })

})

routes.get('/ChangePassword', adminCtl.ChangePassword)

routes.post('/AdminChangePassword', adminCtl.AdminChangePassword)



routes.get('/ForgetPassWord', adminCtl.ForgetPassWord)

routes.post('/ForgottenPasswordForm', adminCtl.ForgottenPasswordForm)

routes.get('/VerifyOtp', adminCtl.VerifyOtp)

routes.post('/verifyOtpForm', adminCtl.verifyOtpForm)

routes.get('/olginforgottenpass', adminCtl.olginforgottenpass)

routes.post('/loginEditPassword', adminCtl.loginEditPassword)


//routes nested

routes.use('/slider', passport.checkAdmin, require("./slider"))

routes.use('/others', passport.checkAdmin, require("./others"))

routes.use('/offer', passport.checkAdmin, require('./offer'))

routes.use('/photos', passport.checkAdmin, require('./photos'))

routes.use('/posts', passport.checkAdmin, require('./post'))

routes.use('/category', passport.checkAdmin, require('./category'));

// routes.use('/subcategory', passport.checkAdmin, require('./subcategroy'));
routes.use('/subcategory', passport.checkAdmin, require('./subcategory'));

// ACTIVE / DEACTIVE
routes.get('/deactive/:id', adminCtl.deactive);
routes.get('/active/:id', adminCtl.active);
// ACTIVE / DEACTIVE CLOSE

// DELETE ALL RECORD WITH CHEK BOX START
routes.post('/slider/deleteAllrecord', adminCtl.deleteAllrecord)
// DELETE ALL RECORD WITH CHEK BOX CLOSE

module.exports = routes