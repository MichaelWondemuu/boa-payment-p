/**
 * Application routes
 */

const middlewares = require('../middlewares')

const API_VERSION = 'v0.0.12'
const API_PATH = `/api/${API_VERSION}`

// Setup Route Bindings
module.exports = app => {
    // Set apiResponse Objects
    app.all('*', middlewares.api.initAPI)

    app.use(`${API_PATH}/ping`, require('./ping').routes)
    app.use(`${API_PATH}/basic`, require('./basic').routes)
    app.use(`${API_PATH}/payment`, require('./payment').routes)
    // app.use(`${API_PATH}/otp`, require('./otp').routes)
    
    // Add default route
    app.get('*', (req, res) => {
        res.apiNotFound(new Error(('Invalid route')))
    })
}
