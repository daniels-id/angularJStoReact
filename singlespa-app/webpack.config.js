const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    'root-config': './src/root-config/root-config.ts',
    'angularjs-app': './src/angularjs-app/main.ts',
    'react-app': './src/react-app/main.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    libraryTarget: 'system', // Output as SystemJS module
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/, // Handle .ts and .tsx files
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'], // Add .tsx
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
  // Exclude dependencies that will be loaded via SystemJS import map
  externals: ['single-spa', 'react', 'react-dom', 'angular'], // Adjusted externals slightly
  mode: 'development', 
}; 