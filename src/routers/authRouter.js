const express = require('express')
const authController = require("../controller/authController")
const passportController = require('../controller/passportController')
const passport = require('passport')


const route = express.Router()

route.post('/login', passportController.handleLogin)
route.get('/logout', passportController.handleLogout)
route.post('/register', authController.resgister)
route.post('/send-otp', authController.sendOTP)

route.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

route.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        console.log('>>> req.user', req.user)
        return req.user
    });

route.get('/user', (req, res) => {
    if (req.isAuthenticated()) {
        return res.json(req.user);
    }
    res.status(401).json({ message: 'Unauthorized' });
});



module.exports = route