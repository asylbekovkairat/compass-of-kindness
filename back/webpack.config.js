const path = require('path');
// const BytenodeWebpackPlugin = require("bytenode-webpack-plugin");
const nodeExternals = require('webpack-node-externals');

module.exports = {
  mode: 'production',
  entry: {
    buildappname: __dirname + '/index.js',
  },
  target: 'node',
  externals: [nodeExternals()],
  output: {
    path: path.join(__dirname),
    // path: path.join(__dirname, "build"),
    filename: '[name].js',
    libraryTarget: 'var',
    library: 'app',
  },
  //   ,  plugins: [new BytenodeWebpackPlugin()],
};
