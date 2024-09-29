const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsnc = require("../utils/wrapAsnc.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js")
const controllersuser = require("../controllers/users.js")


// signupform
router.get("/signup", controllersuser.signupform);

//signup
router.post("/signup", wrapAsnc(controllersuser.signup));

//login form
router.get("/login", controllersuser.loginform);

//login
router.post('/login', passport.authenticate('local', { failureRedirect: '/login', failureFlash: true }), saveRedirectUrl, controllersuser.login);

//logout
router.get('/logout', controllersuser.logout)

module.exports = router;