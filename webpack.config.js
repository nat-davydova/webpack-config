const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const fs = require("fs");
const path = require("path");

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist')
}

const PAGES_PUG = `${PATHS.src}/pug/`
const PAGES = fs.readdirSync(PAGES_PUG).filter(filename => filename.endsWith('.pug'))

module.exports = {
  entry:  {
    app: [`${PATHS.src}/scripts/app.js`, `${PATHS.src}/scss/styles.scss`]
  },
  output:{
    path: `${PATHS.dist}`,
    filename: './scripts/[name].[hash].min.js'
  },
  optimization: {
    minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})],
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: 'vendor',
          test: /node_modules/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  devtool: 'source-map',
  devServer: {
    overlay: true
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
        exclude: '/node_modules'
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {sourceMap: true}
          },
          {
            loader: "postcss-loader",
            options: {sourceMap: true}
          },
        ],
        exclude: '/node_modules'
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: "css-loader",
            options: {sourceMap: true}
          },
          {
            loader: "postcss-loader",
            options: {sourceMap: true}
          },
          {
            loader: "sass-loader",
            options: {sourceMap: true}
          },
        ],
        exclude: '/node_modules'
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: '/node_modules'
      }
    ]
  },
  plugins: [
    ...PAGES.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_PUG}/${page}`,
      filename: `./${page.replace(/\.pug/, '.html')}`
    })),
    new MiniCssExtractPlugin({
      template: `${PATHS.src}/styles/styles.scss`,
      filename: `styles/styles.min.css`
    }),
    new CopyPlugin({
      patterns: [
        { from: './src/assets/favicon', to: 'assets/favicon' },
        { from: './src/assets/fonts', to: 'assets/fonts' },
        { from: './src/assets/img', to: 'assets/img'}
      ]
    }),
    new ImageminPlugin({
      disable: process.env.NODE_ENV !== 'production', // Disable during development
      test: /\.(jpe?g|png|gif|svg)$/i })
  ],
};
