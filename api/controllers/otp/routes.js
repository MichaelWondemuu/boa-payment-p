const routes = require('express').Router()
const SmsNotification = require('./otp-handler');
routes.get('/otp', SmsNotification.sendOtpCode);
routes.post('/verify', SmsNotification.verifyOtpCode);


module.exports = routes
