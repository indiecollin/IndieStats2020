const path = require('path');
const webpack = require('webpack');
const webpackNodeExternals = require('webpack-node-externals');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const browserConfig = {
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

// optimization: {
//     splitChunks: {
//         cacheGroups: {
//             default: false,
//             vendors: false,
//             vendor: {
//                 // sync + async chunks
//                 chunks: 'all',
//                 // import file path containing node_modules
//                 test: /node_modules/,
//                 name: 'vendor',
//                 priority: 20
//             },
//             common: {
//                 name: 'common',
//                 minChunks: 2,
//                 //chunks: 'async',
//                 chunks: 'all',
//                 priority: 10,
//                 reuseExistingChunk: true,
//                 enforce: true
//             }
//         }
//     }
// },

const serverConfig = {
    target: 'node',
    mode: 'development',
    devtool:'inline-source-map',
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
            __isBrowser__: 'false'
        }),
        new ExtractTextPlugin('style.css')
    ],
    externals: [webpackNodeExternals()]
};

module.exports = [browserConfig, serverConfig];