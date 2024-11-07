require('dotenv').config()
const express = require('express')
const authController = require("../controller/authController")
const passportController = require('../controller/passportController')
const passport = require('passport')
const JWTController = require("../controller/JWTController")
const JWTActions = require('../middleware/JWTActions')

const route = express.Router()

route.all("*", JWTActions.verifyJWT)
route.post('/login', passportController.handleLogin)
route.get('/logout', passportController.handleLogout)
route.post('/register', authController.resgister)
route.post('/send-otp', authController.sendOTP)
route.post('/verify-token', JWTController.verifyToken)
route.post('/forgot-password', authController.forgotPassword)
route.post('/update-user', authController.updateUser)

route.get('/google',
    passport.authenticate('google', { scope: ['profile', 'email'] }));

route.get('/google/callback',
    passport.authenticate('google', { failureRedirect: '/login' }),
    function (req, res) {
        console.log('callback', req.user)
        const { code, type_account } = req.user
        res.redirect(`${process.env.REACT_URL}/authenticate?token=${code}&type=${type_account}`);
    });

route.get('/user', (req, res) => {
    if (req.isAuthenticated()) {
        return res.json(req.user);
    }
    res.status(401).json({ message: 'Unauthorized' });
});



module.exports = route