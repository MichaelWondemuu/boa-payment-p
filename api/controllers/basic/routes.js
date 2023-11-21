const routes = require('express').Router()
const BasicController = require('./basic-handler');
routes.get('/', BasicController.dbHealth);

routes.post('/tokens', BasicController.setToken);

routes.get('/tokens', BasicController.getToken);

routes.get('/latest-token', BasicController.dbHealth);

module.exports = routes
