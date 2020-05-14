const path = require('path');
const Dotenv = require('dotenv-webpack');
const ReactLoadableSSRAddon = require('react-loadable-ssr-addon');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

module.exports = {
    target: 'node',
    mode: process.env.NODE_ENV || 'development',    
    devtool:'inline-source-map',
    entry: './src/client.js',
    output: {
        publicPath: '/',
        path: path.resolve(__dirname, 'dist/public'),
        filename: '[name].js',
        chunkFilename: '[name].chunk.js'
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
                    ],
                    plugins: [
                        require('@babel/plugin-proposal-class-properties'),
                        require('@babel/plugin-proposal-object-rest-spread'),
                        require('@babel/plugin-syntax-dynamic-import'),
                        require('babel-plugin-styled-components'),
                        require('react-loadable/babel'),
                    ],
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
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: 'vendors',
                    chunks: 'all',
                    minChunks: 2,
                },
                default: {
                    minChunks: 2,
                    reuseExistingChunk: true,
                },
            },
        },
    },
    plugins: [        
        new Dotenv(),
        new ReactLoadableSSRAddon({filename: 'react-loadable-ssr-addon.json',}),
        new MiniCssExtractPlugin({filename: 'styles.css'}),
    ]
};