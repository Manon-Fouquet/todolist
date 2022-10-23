const path = require('path')
const webpack = require('webpack')

// Common plugins
const { merge } = require('webpack-merge');
const HtmlWebPackPlugin = require("html-webpack-plugin")

//Development plugins
const { CleanWebpackPlugin } = require('clean-webpack-plugin')


// Production plugins
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

const commonConfig = {
    entry: './src/client/index.jsx',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'main.js',
        libraryTarget: 'var',
        library: 'Client'
    },
    resolve:{
        // Search for extensions in this order
        extensions:['.jsx','.js']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                //todo see if we can add ['es2015', {modules: false}] and replace "module.exports = ..." by "export default ..."
                use:[{loader: "babel-loader",
                    options: {
                        presets: ['@babel/preset-env','@babel/preset-react']
                    }
                }],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                exclude: /node_modules/,
                loader: "file-loader",
                options: {
                  name: '[path][name].[ext]',
                }
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env':{
                NODE_ENV : JSON.stringify(process.env.NODE_ENV)
            }
        }),
        new HtmlWebPackPlugin({
            template: "./src/client/views/index.html",
            filename: "./index.html"
        })
    ]
};
 
const productionConfig = {
    mode: 'production',
    optimization: {
        minimizer: [new TerserPlugin({}), new OptimizeCSSAssetsPlugin({})],
    },
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [ MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader' ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({filename: '[name].css'}),
    ]
 };
 
const developmentConfig = {
    mode: 'development',
    module: {
        rules: [
            {
                test: /\.scss$/,
                use: [ 'style-loader', 'css-loader', 'sass-loader' ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin({
            // Simulate the removal of files
            dry: true,
            // Write Logs to Console
            verbose: true,
            // Automatically remove all unused webpack assets on rebuild
            cleanStaleWebpackAssets: true,
            protectWebpackAssets: false
        })
    ]
};

 
 
module.exports = () => {
    let conf={}
    console.log("#### Using configuration : "+process.env.NODE_ENV+" ####")
    switch(process.env.NODE_ENV) {
    case 'development':
      conf =  merge(commonConfig, developmentConfig);
      break;
    case 'production':
      conf =  merge(commonConfig, productionConfig);
      break;
    default:
      throw new Error('No matching configuration was found for environment '+env+'!');
  }
  console.log(":::: Webpack configuration used :::")
  console.log(conf)
  return conf
}