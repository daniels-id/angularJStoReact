const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: {
    'root-config': './src/root-config/root-config.ts',
    'angularjs-app': './src/angularjs-app/main.ts',
    'react-app': './src/react-app/reactParcel.ts',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
    libraryTarget: 'system',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'], 
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', 
      inject: false, // Let SystemJS handle script loading
      scriptLoading: 'system', // Ensure compatibility with SystemJS
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: 'src/favicon.ico', to: 'favicon.ico' },
        { 
          from: 'node_modules/single-spa-angularjs/lib/parcel.js',
          to: 'parcel.js' 
        }
      ]
    })
  ],
  devServer: {
    static: [
      { directory: path.join(__dirname, 'dist') },
      { directory: path.join(__dirname, '..') }
    ],
    compress: true,
    port: 9001,
    historyApiFallback: true, 
    headers: {
      "Access-Control-Allow-Origin": "*", 
    },
    // Force writing files to disk for CopyWebpackPlugin compatibility
    devMiddleware: {
      writeToDisk: true,
    },
  },

  externals: {
    'react': 'react',
    'react-dom': 'react-dom',
    'angular': 'angular' // Tell webpack to find 'angular' via the SystemJS module 'angular'
  },
  mode: 'development', 
}; 