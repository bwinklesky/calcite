const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
var webpack = require('webpack');

module.exports = {
    mode: process.env.NODE_ENV === 'development' ? 'development' : 'production',
    entry: {
        main: {
            import: path.join(__dirname, "ClientApp", "main.ts"),
            library: {                
                type: "module"
            },
        }
    },
    experiments: {
        outputModule: true
    },
    output: {
        path: path.resolve(__dirname, "wwwroot/app"),
        filename: "[name].js",
        //filename: "[name].[chunkhash].js",
        publicPath: "/_content/PrecisionFarms/app/",
        libraryTarget: 'module',
        assetModuleFilename: 'images/[hash][ext][query]'
    },
    resolve: {
        extensions: [".js", ".ts"]
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: "ts-loader"
            },
            {
                test: /\.s[ac]ss$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", {
                    loader: "sass-loader",
                    options: {
                        // Prefer `dart-sass`
                        implementation: require.resolve("sass"),
                        sassOptions: {
                            indentWidth: 4,
                            includePaths: ["./ClientApp"]
                        },

                    },
                }]
            },
            // For webpack v5
            {
                test: /\.(png|jpe?g|gif)$/i,
                // More information here https://webpack.js.org/guides/asset-modules/
                type: "asset"
            },
        ]
    },
    //optimization: {
    //    splitChunks: {
    //        cacheGroups: {
    //            vendor: {
    //                test: /[\\/]node_modules[\\/](kendo-ui-core|bootstrap|jquery)[\\/]/,
    //                name: 'vendor',
    //                chunks: 'all',
    //            }                
    //        },
    //    }
    //},
    plugins: [
        new webpack.ProvidePlugin({
            // $: 'jquery',
            // jQuery: 'jquery',
            //kendo: 'kendo-ui-core',
            //'window.kendo': 'kendo-ui-core',
            //'window.bootstrap': 'bootstrap'
        }),
        //new ArcGISPlugin(),
        new CleanWebpackPlugin(),
        //new HtmlWebpackPlugin({
        //    template: "./src/index.html"
        //}),
        new MiniCssExtractPlugin({
            filename: "[name].css"
            //filename: "css/[name].[chunkhash].css"
        })
    ]
};