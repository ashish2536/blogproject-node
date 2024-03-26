const passport = require('passport');

const passportLocal = require("passport-local").Strategy;

const session = require("express-session");

const admin = require("../models/admim_model")

passport.use(new passportLocal({
    usernameField: 'email'
}, async function (email, password, done) {
    let adminData = await admin.findOne({ email: email });

    if (adminData) {
        if (adminData.password == password) {
            console.log(email, password);
            return done(null, adminData);
        }
        else {
            return done(null, false);
        }
    }
    else {
        return done(null, false);
    }
}))

passport.serializeUser((admin, done) => {
    console.log(admin)
    return done(null, admin.id)
})

passport.checkAdmin = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    }
    else {
        return res.redirect('/admin/')
    }
}

passport.deserializeUser(async (id, done) => {
    const adminData = await admin.findById(id);
    if (adminData) {
        return done(null, adminData)
    }
    else {
        return done(null, false)
    }
})

passport.setAuthenticatedUser = function (req, res, next) {
    if (req.isAuthenticated()) {
        res.locals.Admins = req.user;
    }
    next();
}


module.exports = passport;