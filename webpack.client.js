const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
    target: 'node',
    mode: 'development',
    devtool:'inline-source-map',
    entry: './src/client.js',
    output: {
        path: path.resolve(__dirname, 'dist/public'),        
        filename: 'bundle.[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js', 
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
    ],
    optimization: {
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: false,
                vendor: {
                    // sync + async chunks
                    chunks: 'all',
                    // import file path containing node_modules
                    test: /node_modules/,
                    name: 'vendor',
                    priority: 20
                },
                common: {
                    name: 'common',
                    minChunks: 2,
                    //chunks: 'async',
                    chunks: 'all',
                    priority: 10,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        }
    },
};