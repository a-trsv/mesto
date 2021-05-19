// webpack.config.js
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: { main: './src/pages/index.js' },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    MiniCssExtractPlugin.loader, 
                  {  
                      loader: 'css-loader',
                    options: {
                        importLoaders: 1
                    }
                },
            'postcss-loader'
                ]
            },
            {
                test: /\.(png|svg|jpg|gif|woff|woff2)$/,
                type: 'asset/resource',
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: '/node-modules/'
            },
            {
                test: /\.html$/i,
                loader: 'html-loader',
              },
          ] 
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html'
        }),
        new MiniCssExtractPlugin(),
        new CleanWebpackPlugin(), 
    ]
}
