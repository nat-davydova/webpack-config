const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const ImageminPlugin = require("imagemin-webpack-plugin").default;
const SVGSpritemapPlugin = require("svg-spritemap-webpack-plugin");

const path = require("path");
const fs = require("fs");

const PATHS = {
  src: path.join(__dirname, "./src"),
  dist: path.join(__dirname, "./dist"),
  icons: path.join(__dirname, "./src/assets/icons")
};

const PAGES_PUG = `${PATHS.src}/pug/`;
const PAGES_TO_CONVERT = fs
  .readdirSync(PAGES_PUG)
  .filter(filename => filename.endsWith(".pug"));

module.exports = {
  entry: {
    app: [`${PATHS.src}/scripts/app.js`, `${PATHS.src}/scss/styles.scss`]
  },
  output: {
    path: `${PATHS.dist}`,
    filename: "./scripts/[name].[fullhash].min.js"
  },
  target: "web",
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    publicPath: "/",
    open: true,
    watchContentBase: true,
    port: 8080,
    overlay: true,
    compress: true
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          name: "vendor",
          test: /node_modules/,
          chunks: "all",
          enforce: true
        }
      }
    }
  },
  resolve: {
    extensions: [".ts", ".js"]
  },
  devtool: "source-map",
  module: {
    rules: [
      {
        test: /\.pug$/,
        loader: "pug-loader",
        exclude: "/node_modules"
      },
      {
        test: /\.(scss|css)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: "css-loader",
            options: { sourceMap: true }
          },
          {
            loader: "postcss-loader",
            options: { sourceMap: true }
          },
          {
            loader: "resolve-url-loader"
          },
          {
            loader: "sass-loader",
            options: { sourceMap: true }
          }
        ],
        exclude: "/node_modules"
      },
      {
        test: /\.js$/,
        loader: "babel-loader",
        exclude: "/node_modules"
      },
      {
        test: /\.ts$/,
        loader: "ts-loader",
        exclude: "/node_modules"
      },
      {
        test: /.(jpg|jpeg|png|svg)$/,
        type: "asset/inline"
      },
      {
        test: /\.(woff(2)?|eot|ttf|otf)$/,
        type: "asset/inline"
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    ...PAGES_TO_CONVERT.map(
      page =>
        new HtmlWebpackPlugin({
          template: `${PAGES_PUG}/${page}`,
          filename: `./${page.replace(/\.pug/, ".html")}`
        })
    ),
    new MiniCssExtractPlugin({
      filename: `styles/styles.[hash].min.css`
    }),
    new CopyPlugin({
      patterns: [
        {
          from: "./src/assets/favicon",
          to: "assets/favicon",
          noErrorOnMissing: true
        },
        { from: "./src/assets/img", to: "assets/img", noErrorOnMissing: true },
        {
          from: "./src/assets/fonts",
          to: "assets/fonts",
          noErrorOnMissing: true
        }
      ]
    }),
    new SVGSpritemapPlugin("./src/assets/icons/icons-colored/**/*.svg", {
      output: {
        filename: "assets/sprites/sprites-colored/sprites.svg",
        svg4everybody: true,
        svgo: {
          plugins: [
            { inlineStyles: { onlyMatchedOnce: false } },
            { minifyStyles: true }
          ]
        }
      },
      sprite: {
        prefix: false
      }
    }),
    new SVGSpritemapPlugin(`./src/assets/icons/icons-solid/**/*.svg`, {
      output: {
        filename: "assets/sprites/sprites-solid/sprites.svg",
        svg4everybody: {
          polyfill: true
        },
        svgo: {
          plugins: [{ removeAttrs: { attrs: "(stroke|fill|style)" } }]
        }
      },
      sprite: {
        prefix: false
      }
    }),
    new ImageminPlugin({
      test: /\.(jpe?g|png|gif)$/i
    })
  ]
};
