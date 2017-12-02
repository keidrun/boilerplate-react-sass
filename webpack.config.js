const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const PATH = {
  INDEX: {
    JS: './src/components/index.jsx',
    CSS: './src/styles/index.scss',
    HTML: './src/index.html',
  },
  DIST: path.join(__dirname, 'public'),
};
const VENDOR_LIBS = ['react', 'react-dom'];

module.exports = {
  entry: {
    bundle: [PATH.INDEX.JS, PATH.INDEX.CSS, PATH.INDEX.HTML],
    vendor: VENDOR_LIBS,
  },
  output: {
    path: PATH.DIST,
    filename: '[name].[hash].js',
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['remove-flow-types-loader'],
        enforce: 'pre',
        include: path.join(__dirname, 'src'),
      },
      {
        test: /\.(js|jsx)$/,
        use: ['eslint-loader'],
        enforce: 'pre',
        exclude: /node_modules/,
      },
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'postcss-loader', 'sass-loader'],
        }),
      },
      {
        test: /\.html$/,
        use: 'html-loader',
      },
      {
        test: /\.(jpe?g|png|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: { limit: 40000 },
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      names: ['vendor', 'manifest'],
    }),
    new HtmlWebpackPlugin({
      template: PATH.INDEX.HTML,
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
    }),
    new ExtractTextPlugin('bundle.[hash].css'),
    new webpack.HotModuleReplacementPlugin(),
  ],
  devtool: 'source-map',
  devServer: {
    hot: true,
    contentBase: PATH.DIST,
    port: 8080,
    inline: true,
    historyApiFallback: true,
    stats: {
      version: false,
      hash: false,
      chunkModules: false,
    },
  },
};
