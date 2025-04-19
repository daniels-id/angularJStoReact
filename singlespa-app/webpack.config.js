const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/root-config/root-config.ts',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    libraryTarget: 'system', // Output as SystemJS module
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', 
      inject: false, // Let SystemJS handle script loading
      scriptLoading: 'system', // Ensure compatibility with SystemJS
    }),
  ],
  devServer: {
    static: path.join(__dirname, 'dist'),
    compress: true,
    port: 9001,
    historyApiFallback: true, // Important for single-spa routing
    headers: {
      "Access-Control-Allow-Origin": "*", // Allow CORS for loading microfrontends
    },
  },
  externals: ['single-spa'], // Exclude single-spa from the bundle, load via import map
  mode: 'development', 
}; 