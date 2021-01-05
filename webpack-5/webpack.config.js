const { CleanWebpackPlugin } = require('clean-webpack-plugin');

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
    app: `${PATHS.src}/scripts/app.js`
  },
  output:{
    path: `${PATHS.dist}`,
    filename: './scripts/[name].[fullhash].min.js'
  },
  module: {
    rules: [

    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
  ]
}
