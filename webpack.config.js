const HtmlWebPackPlugin = require("html-webpack-plugin");
const CopyWebPackPlugin = require('copy-webpack-plugin');

const htmlPlugin = new HtmlWebPackPlugin({
    template: "./src/index.html",
    filename: "./index.html"
});

module.exports = {
    entry: './src/index.tsx',
    output: {
        filename: './dist/bundle.js'
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx"]
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                use: {
                    loader: 'awesome-typescript-loader'
                },
                exclude: /node_modules/
            },
            { enforce: "pre", test: /\.js$/, loader: "source-map-loader" },
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            {
                test: /\.(gif|png|jpe?g|svg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                        }
                    }
                ],
            },
            {
                test: /\.(woff(2)?|ttf|eot|svg)(\?v=\d+\.\d+\.\d+)?$/,
                use: [
                    {
                        loader: 'file-loader',
                        options: {
                            name: '[name].[ext]',
                            outputPath: 'fonts/'
                        }
                    }
                ]
            }
        ]
    },

    devServer: {
        historyApiFallback: true,
        proxy: [
            {
                context: ['/proxy'],
                target: 'http://10.60.17.243:8304',
                pathRewrite: {"^/proxy": ""}
            },
            {
                context: ['/ws'],
                target: 'http://10.60.17.243:8304',
                ws: true
            }
        ]
    },

    devtool: "source-map",

    plugins: [
        htmlPlugin,
        new CopyWebPackPlugin([
            { from: 'assets', to: 'assets' }
        ])
    ]
}
