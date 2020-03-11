const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
    entry: {
        bundle: './src/index.js'        
    },
    mode: 'development',
    devtool:'inline-source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        //filename: '[name].[chunkhash].js',
        filename: 'bundle.[chunkhash].js',
        chunkFilename: '[name].[chunkhash].js',        
        publicPath: './'//double check the path
    },
    module: {
        rules: [
            {
                use: 'babel-loader',
                test: /\.jsx?$/,      
                exclude: /node_modules/       
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
        new HtmlWebpackPlugin({
            template: './index.html'
        })
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

module.exports = config;