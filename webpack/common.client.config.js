const merge = require('webpack-merge');
const baseWebpackConfig = require('./_common.client.config')
module.exports = merge(baseWebpackConfig, {
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                // vendor chunk
                vendor: {
                    name: 'vendor',
                    // async + async chunks
                    chunks: 'all',
                    priority: 20,
                    // import file path containing node_modules
                    test: /node_modules/
                },
                common: {
                    name: 'common',
                    minChunks: 2,
                    chunks: 'async',
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    }
});