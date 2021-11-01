const { createProxyMiddleware } = require('http-proxy-middleware')
let urlTarget = process.env.NODE_ENV === 'production' ?  "https://yebling.herokuapp.com" : 'http://localhost:5000'
module.exports = function(app){
    app.use(
        '/api',
        createProxyMiddleware({
            target: urlTarget,
            changeOrigin: true,
        })
    )
} 