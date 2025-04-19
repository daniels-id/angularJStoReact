const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.ts',
  mode: 'development', // Set to 'production' for build script
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true, // Clean the output directory before each build
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Path to your source index.html
      inject: 'body', // Inject the bundle script into the body
    }),
  ],
  devtool: 'inline-source-map', // Enable source maps for easier debugging
  devServer: {
    static: './dist', // Serve content from the dist directory
    port: 9000, // Port for the dev server
    hot: true, // Enable Hot Module Replacement
  },
}; 