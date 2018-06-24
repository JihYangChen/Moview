var express = require('express');
var router = express.Router();
var passport = require('passport');
var LoginController = require('../controller/LoginController');

router.get('/auth/facebook', function(req, res, next) {
    let loginController = new LoginController(passport);
    loginController.login(req, res, next);
});

// router.get('/auth/facebook', passport.authenticate('facebook', { 
//     scope : ['public_profile', 'email']
// }));

router.get('/auth/facebook/callback', passport.authenticate('facebook', { failureRedirect: '/login' }), (req, res) => {
    res.redirect('/');
});

router.get('/login', (req, res, next) => {
    res.render('login/login')
});

router.get('/logout', function(req, res){
    req.logout();
    res.redirect('/');
});

router.get('/profile', require('connect-ensure-login').ensureLoggedIn(), (req, res) => {
    res.render('login/profile', { user: req.user });
});

module.exports = router