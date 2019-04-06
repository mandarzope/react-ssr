const merge = require('webpack-merge');
const baseWebpackConfig = require('./_common.server.config')
module.exports = merge(baseWebpackConfig, {
    optimization: {
        minimize: false
    },
});