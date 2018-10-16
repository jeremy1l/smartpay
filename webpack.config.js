const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const webpack = require("webpack");
module.exports = {
    entry: "./src/index.js",
    output: {
        path: path.join(__dirname, "/dist"),
        filename: "index-bundle.js",
        publicPath: "/"
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ["babel-loader"]
            },

            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.(png|jpe?g)/i,
                //include: path.join(__dirname, 'assets/images/'),
                use: [
                    {
                        loader: "url-loader",
                        options: {
                            name: "./img/[path]/[name].[ext]",
                            limit: 10000
                        }
                    },
                    {
                        loader: "img-loader"
                    }
                ]
            },
            {
                test: /\.svg$/,
                use: [
                    {
                        loader: "babel-loader"
                    },
                    {
                        loader: "react-svg-loader",
                        options: {
                            jsx: true // true outputs JSX tags
                        }
                    }
                ]
            },
            {
                test: /\.(woff(2)?|ttf|eot|otf)(\?v=\d+\.\d+\.\d+)?$/,
                use: [{
                    loader: "file-loader",
                    options: {
                        name: "[name].[ext]",
                        outputPath: "fonts/"
                    }
                }]
            }
        ]
    },
    devServer: {
        historyApiFallback: true,
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/index.html"
        }),
        new webpack.DefinePlugin({
            baseURL: JSON.stringify("/")
        })
    ]
};
