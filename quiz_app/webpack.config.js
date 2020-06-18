const path = require('path');

module.exports = {
  entry: './src/app/index.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: [
          /node_modules/,
          path.resolve(__dirname, 'src/server'),
        ]
      },
    ],
  },
  mode: 'production',
  resolve: {
    extensions: ['.ts'],
  },
 
  output: {
    filename: 'app.js',
    path: path.resolve(__dirname, 'public/scripts'),
  },
};