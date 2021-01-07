const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const path = require("path");
const fs = require("fs");

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist')
}

const PAGES_PUG = `${PATHS.src}/pug/`
const PAGES_TO_CONVERT = fs.readdirSync(PAGES_PUG).filter(filename => filename.endsWith('.pug'))

module.exports = {
  entry:  {
    app: [`${PATHS.src}/scripts/app.js`, `${PATHS.src}/scss/styles.scss`]
  },
  output:{
    path: `${PATHS.dist}`,
    filename: './scripts/[name].[fullhash].min.js'
  },
  target: 'web',
  devServer: {
    contentBase: path.join(__dirname, 'dist'),
    publicPath: '/',
    open: true,
    watchContentBase: true,
    port: 8080,
    overlay: true
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: 'pug-loader',
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
            loader: "resolve-url-loader"
          },
          {
            loader: "sass-loader",
            options: {sourceMap: true}
          },
        ],
        exclude: '/node_modules'
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...PAGES_TO_CONVERT.map(page => new HtmlWebpackPlugin({
      template: `${PAGES_PUG}/${page}`,
      filename: `./${page.replace(/\.pug/, '.html')}`
    })),
    new MiniCssExtractPlugin(
      {
        filename: `styles/styles.[hash].min.css`
      }
    ),
  ]
}
