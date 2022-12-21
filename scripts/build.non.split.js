const rewire = require('rewire');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const defaults = rewire('react-scripts/scripts/build.js');
let config = defaults.__get__('config');

config.optimization.splitChunks = {
    cacheGroups: {
        default: false,
    },
};

config.output.filename = 'static/js/agm_bundle.js'
config.plugins[8] = new MiniCssExtractPlugin({
          filename: 'static/css/agm_bundle.css',
          chunkFilename: 'static/css/agm_bundle.chunk.css',
        })

config.optimization.runtimeChunk = false;