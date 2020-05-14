const path = require('path');
const Dotenv = require('dotenv-webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const webpackNodeExternals = require('webpack-node-externals');

module.exports = {
    target: 'node',
    mode: process.env.NODE_ENV || 'production',    
    entry: './server.js',
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/dist'
    },
    module: {
        rules:[
            {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /@babel(?:\/|\\{1,2})runtime|core-js/,
                options:{
                    presets: [
                        '@babel/react',
                        '@babel/env'
                    ]
                }
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, 'css-loader']
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
        new Dotenv(),
        new MiniCssExtractPlugin({filename: 'styles.css',}),
    ],
    externals: [webpackNodeExternals()]
};