const path = require('path');

module.exports = {
  entry: './scripts/src/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  mode: 'production',
  resolve: {
    extensions: ['.ts'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'scripts/build'),
  },
};