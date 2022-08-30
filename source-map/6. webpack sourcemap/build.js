const webpack = require('webpack');
const { merge } = require('webpack-merge');
const path = require('path');

const baseConfig = {
    entry: path.join(__dirname, "./src/index.js"),
    mode: 'development',
    output: {
        filename: "[name].js",
        path: path.join(__dirname, "./dist")
    }
}

function getConfig(customConfig) {
    const config = JSON.parse(JSON.stringify(baseConfig));
    return merge(config, customConfig)
}

function build(config) {
    return new Promise((resolve, reject) => {
        webpack(config, function (err) {
            console.log('error:', err);
            if (err) reject(err);
            console.log('webpack build finished');
            resolve(null);
        });
    });
}

const sourceMaps = [
    'eval',
    'eval-cheap-source-map',
    'eval-cheap-module-source-map',
    'eval-source-map',
    'cheap-source-map',
    'cheap-module-source-map',
    'source-map',
    'inline-cheap-source-map',
    'inline-cheap-module-source-map',
    'inline-source-map',
    'eval-nosources-cheap-source-map',
    'eval-nosources-cheap-module-source-map',
    'eval-nosources-source-map',
    'inline-nosources-cheap-source-map',
    'inline-nosources-cheap-module-source-map',
    'inline-nosources-source-map',
    'nosources-cheap-source-map',
    'nosources-cheap-module-source-map',
    'nosources-source-map',
    'hidden-nosources-cheap-source-map',
    'hidden-nosources-cheap-module-source-map',
    'hidden-nosources-source-map',
    'hidden-cheap-source-map',
    'hidden-cheap-module-source-map',
    'hidden-source-map'
];

const allConfigs = sourceMaps.map(m => (getConfig({
    output: {
        filename: `${m}/index.js`,
    },
    devtool: m
})));

allConfigs.forEach(build)



