
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var helpers = require('./helpers');
var nodeExternals = require('webpack-node-externals');
var LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: {
    'polyfills': './src/polyfills.ts',
    'vendor': './src/vendor.ts',
    'app': './src/main.ts'
  },

  //target: 'node', // in order to ignore built-in modules like path, fs, etc. 

  externals: [nodeExternals()],

  devtool: 'eval', 

  resolve: {    
    extensions: ['.js', '.ts']
  },

  module: {
    loaders: [
      {
        test: /\.ts$/,
        exclude:[/node_modules/],
        loaders: ['ts']
      },
      {
        test: /\.html$/,
        loader: 'html'
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
        loader: 'file?name=assets/[name].[hash].[ext]'
      },
      {
        test: /\.css$/,
        exclude: helpers.root('src', 'app'),
        loader: ExtractTextPlugin.extract({ fallbackLoader: 'style-loader', loader: 'css-loader' })
      },
      {
        test: /\.css$/,
        include: helpers.root('src', 'app'),
        loader: 'raw'
      },
      {
         test: /\.sass$/,
          loader: ExtractTextPlugin.extract(
            { fallbackLoader: 'style-loader', loader: 'sass-loader' }              
          )
      }
    ]
  },

  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'polyfills']
    }),

    new LiveReloadPlugin(),
    //new CleanWebpackPlugin(['dist'], {
    //    root: '',
    //    verbose: true, 
    //    dry: false,
    //    exclude: ['shared.js']
    //}),

    new HtmlWebpackPlugin({
        template: './src/index.html'
    })
  ]
};