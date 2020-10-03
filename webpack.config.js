const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require('copy-webpack-plugin');
const path = require("path");

module.exports = {
  entry:  {
    app: [
      './src/app.js',
      './src/css/styles.css'
    ]
  },
  output:{
    path: path.resolve(__dirname, './dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
         },
          "css-loader"
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "src", "index.html")
    }),
    new MiniCssExtractPlugin({
      filename: `styles/styles.css`
   }),
  new CopyPlugin({
    patterns: [
      { from: './src/assets/favicon', to: 'assets/favicon' },
      { from: './src/assets/fonts', to: 'assets/fonts' },
    ]
  }),
  ],
};
