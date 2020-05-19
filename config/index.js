'use strict'

module.exports = {
    build: {
        assetsPath: 'static',
        assetsPublicPath: '/',
        env: 'production',
        devtool: '#source-map',
        productionSourceMap: true,
        cssSourceMap: true,
        extract: true,
        cacheBusting: true
    },
    dev: {
        assetsPath: 'static',
        assetsPublicPath: '/',
        env: 'development',
        notifyOnErrors: true,
        host: 'yzmx.develop-tools.com',
        port: 9998,
        proxy: {
            '/api/v1': 'http://localhost:8888'
        },
        devtool: 'cheap-module-eval-source-map',
        cssSourceMap: true,
        extract: false,
        cacheBusting: true
    }
};