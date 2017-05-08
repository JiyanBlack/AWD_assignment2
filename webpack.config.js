const path = require('path');
const webpack = require('webpack');

module.exports = {
    context: path.resolve(__dirname, 'server/static/assets/js'),
    entry: {
        app: ['./main.js'],
    },
    output: {
        path: path.resolve(__dirname, 'server/static/assets/js'),
        filename: './bundle.js',
    },
    devServer: {
        contentBase: path.resolve(__dirname, './server/static/'),
    },
    module: {
        rules: [{
            test: /\.js$/,
            exclude: [/node_modules/],
            use: [{
                loader: 'babel-loader',
                options: { presets: ['es2015'] }
            }],
        }, ],
    },
};

console.log("Webpack is running on port: 8080")