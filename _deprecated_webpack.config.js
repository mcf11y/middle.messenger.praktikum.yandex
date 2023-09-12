const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin").CleanWebpackPlugin;
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

module.exports = {
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle-[hash].js",
  },
  resolve: {
    extensions: [".ts", ".js"],
    plugins: [new TsconfigPathsPlugin({})],
  },
  devServer: {
    contentBase: "dist",
    compress: true,
    port: 3000,
  },
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
      },
      {
        test: /\.(png|jpe?g|gif|svg)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: 'url-loader',
            options: {
              encoding: false,
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {},
          },
          "css-loader",
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            }
          },
        ],
      },
      { test: /\.hbs$/, loader: "handlebars-loader" },

    ],
  },
  plugins: [
    new CleanWebpackPlugin(),
    // new CopyWebpackPlugin({
    //   patterns: [
    //     {
    //       from: "**/*",
    //       context: path.resolve(__dirname, "static"),
    //       to: "./assets",
    //     },
    //   ],
    // }),
    new HtmlWebpackPlugin({
      template: "static/index.html",
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "style-[hash].css",
    }),
  ],
};
