
// Dependencies
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

const nodeModules = {};
  fs.readdirSync('node_modules')
    .filter(function(x) {
      return ['.bin'].indexOf(x) === -1;
    })
    .forEach(function(mod) {
      nodeModules[mod] = 'commonjs ' + mod;
    });

module.exports = {
  entry: {
    server: path.join(process.cwd(), 'server', 'index'),
  },
  output: {
    path: path.join(process.cwd(), 'build', 'server'),
    filename: 'index.js',
  },
  target: 'node',
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    modulesDirectories: ['node_modules'],
    extensions: [
      '',
      '.js',
      '.jsx',
    ],
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel',
      }
    ]
  },
  plugins: [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin(),
  ],
  externals: nodeModules,
};
