const path = require("path");

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist')
}

module.exports = {
  entry:  {
    app: `${PATHS.src}/scripts/app.js`
  },
  output:{
    path: `${PATHS.dist}`,
    filename: './scripts/[name].[fullhash].min.js'
  },
}
