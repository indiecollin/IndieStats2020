const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    target: 'node',
    mode: 'development',
    devtool:'inline-source-map',
    entry: './src/client.js',
    output: {
        filename: 'client_bundle.js',
        path: path.resolve(__dirname, 'dist/public'),
        publicPath: '/'
    },
    module: {
        rules:[
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: '/node_modules/',
                options:{
                    presets: [
                        '@babel/react',
                        '@babel/env'
                    ]
                }
            },
            {
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    use: 'css-loader'
                }),
                test: /\.css$/
            }, 
            {
                test: /\.(jpe?g|png|gif|svg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: { limit: 40000 }
                    },
                    'image-webpack-loader'
                ]
            }
        ]
    },
    plugins: [        
        new webpack.DefinePlugin({
            __isBrowser__: 'true'
        }),
        new ExtractTextPlugin('style.css')
    ]
};