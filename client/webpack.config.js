const path = require('path');
const webpack = require('webpack');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');

module.exports = {
  plugins: [
    new ForkTsCheckerWebpackPlugin(),
    new ESLintPlugin({
      files: 'src/**/*.(js|jsx|ts|tsx)',
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
      lintDirtyModulesOnly: true,
      emitError: true,
      emitWarning: true,
      failOnError: false,
      failOnWarning: false,
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],
  entry: path.resolve(__dirname, 'src/index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  devtool: 'source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'dist'),
    open: true,
    stats: 'errors-only',
    compress: true,
    port: 3000,
    hot: true,
    historyApiFallback: true,
    clientLogLevel: 'error',
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts'],
    alias: {
      Api$: path.resolve(__dirname, 'src/generated/graphql.tsx'),
      Components: path.resolve(__dirname, 'src/components'),
      Utils: path.resolve(__dirname, 'src/utils'),
    },
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
          },
        },
      },
    ],
  },
};
