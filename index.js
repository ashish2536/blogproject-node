const express = require('express');
const path = require('path');
var cookieParser = require('cookie-parser')
const port = 8012;
const app = express();

// const db = require('./config/mongoose')

// ONLINE DATA STORE START
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://vaghelaashish67890:vaghelaashish67890@cluster0.zgfnwyz.mongodb.net/BlogAshish', {
    useNewUrlParser: true
}).then((res) => {
    console.log('DB is Connected');
})
    .catch((err) => {
        console.log(err);
    })
// ONLINE DATA STORE CLOSE

const passport = require("passport");
const passportLocal = require("./config/passport_local");
const session = require("express-session");

const connectFlash = require('connect-flash')
const flash = require('./config/connectFlash');
app.use(connectFlash());

app.use(cookieParser())

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, 'assets')))

app.use(express.static(path.join(__dirname, 'user-assets')))

app.use(express.urlencoded());

app.use('/uploads', express.static(path.join(__dirname, 'uploads')))

app.use(session({
    name: 'RNW',
    secret: 'Ashish',
    resave: true,
    saveUninitialized: true,
    cookie: {
        maxAge: 60000 * 60 * 100 //1 hour
    }
}))
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setAuthenticatedUser);
app.use(flash.setFlash);

app.use('/', require("./routes"));

app.listen(port, (error) => console.log("server running on port : " + port));