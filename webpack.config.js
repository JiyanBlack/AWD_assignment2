var debug = process.env.NODE_ENV !== "production";
var webpack = require('webpack');
var path = require('path');

module.exports = {
    context: path.join(__dirname, "server", "static"),
    devtool: debug ? "inline-sourcemap" : false,
    entry: {
        profile: "./assets/js/jsx/profile.jsx",
        profileMatch: './assets/js/jsx/ProfileMatch.jsx',
        login: './assets/js/login.js',
        client: './assets/js/client.js',
        register: './assets/js/register.js'
    },
    module: {
        loaders: [{
            test: /\.jsx?$/,
            exclude: /(node_modules|bower_components)/,
            loader: 'babel-loader',
            query: {
                presets: ['react', 'es2015'],
                plugins: ['react-html-attrs', 'transform-class-properties'],
            }
        },
        {
            test: /\.css$/,
            loader: 'style-loader'
        }, {
            test: /\.css$/,
            loader: 'css-loader',
            query: {
                modules: true,
                localIdentName: '[name]__[local]___[hash:base64:5]'
            }
        }
        ]
    },
    output: {
        path: path.join(__dirname, "server", "static"),
        filename: "./assets/js/[name].min.js"
    },
    plugins: debug ? [] : [
        new webpack.optimize.DedupePlugin(),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.UglifyJsPlugin({ mangle: false, sourcemap: false }),
    ],
};