const path = require('path');
const walk = require('@chronocide/fs-walk');

// Plugins
const FsWebpackPlugin = require('fs-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const entries = walk(path.resolve(__dirname, 'src/pages'))
  .filter(file => /.(tsx)$/.test(file))
  .map(file => {
    const dir = file.split(path.sep).slice(-2)[0];
    const name = file.split(path.sep).pop().split('.')[0];

    return ({
      name,
      path: `/src/pages/${dir}/${name}.page.tsx`,
      html: new HtmlWebpackPlugin({
        chunks: [name],
        template: `src/pages/${dir}/${name}.page.html`,
        filename: `${name}.html`
      })
    });
  });

module.exports = {
  target: 'web',
  resolve: {
    extensions: ['.js', '.ts', '.tsx']
  },
  entry: entries.reduce((acc, cur) => ({
    ...acc,
    [cur.name]: cur.path
  }), {}),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: '[name].bundle.js',
    chunkFilename: '[name].[contenthash].chunk.js'
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendors: {
          name: 'vendors',
          test: /[\\/]node_modules[\\/]/,
          chunks: 'all'
        }
      }
    }
  },
  module: {
    rules: [{
      test: /.(ts|tsx)$/,
      include: path.resolve(__dirname, 'src'),
      loader: 'ts-loader'
    }, {
      test: /\.(scss)$/,
      include: path.resolve(__dirname, 'src'),
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        'sass-loader'
      ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].bundle.css',
      chunkFilename: '[name].[contenthash].chunk.css'
    }),
    ...entries.map(entry => entry.html),
    new FsWebpackPlugin([{
      type: 'delete',
      files: 'build',
      hooks: ['beforeRun', 'watchRun']
    }], { verbose: true })
  ]
};
