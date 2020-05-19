'use strict'
const ora = require('ora');
const spinner = ora(`building for ${process.env.NODE_ENV}...`);
spinner.start();

process.env.NODE_ENV = 'production';
const webpack = require('webpack')
const configType = process.env.NODE_ENV === 'development' ? 'dev' : 'prod';
const webpackConfig = require(`./webpack.${configType}.conf`);

webpack(webpackConfig, (err, stats) => {
    spinner.stop();
});