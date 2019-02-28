const webpack = require('webpack');
const HTMLPlugin = require('html-webpack-plugin');

const baseConfig = require('./webpack.config.base');
const merge = require('webpack-merge');

const isDev = process.env.NODE_ENV === 'development';

const defaultPlugins = [
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    new HTMLPlugin()
];

const devServer = {
    port: '8080',
    host: '0.0.0.0',
    overlay:{
        errors: true
    },
    hot: true
};

let config;

if(isDev) {
    config = merge(baseConfig, {
        devServer,
        plugins: defaultPlugins.concat([
            new webpack.HotModuleReplacementPlugin()
        ])
    })
} else {
    config = merge(baseConfig, {
        plugins: defaultPlugins
    })
}

module.exports = config;