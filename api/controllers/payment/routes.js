const PaymentController = require('./payment-handler');

const routes = require('express').Router()

routes.get('/tokens', PaymentController.getBOAtoken);

routes.post('/transfer', PaymentController.setBOAtransfer);

routes.get('/enquiry', PaymentController.getBOAenquiry);

module.exports = routes
