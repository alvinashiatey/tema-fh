const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
var OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  entry: {
    main: "./src/js/index.js",
    tema: "./src/tema/js/tema.js",
  },
  output: {
    path: path.resolve(__dirname, "public"),
    filename: `js/[name].bundle.js`,
  },
  devServer: {
    contentBase: "./public",
  },
  optimization: {
    minimizer: [new TerserPlugin(), new OptimizeCssAssetsPlugin()],
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].css",
      chunkFilename: "css/[id].css",
    }),
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      chunks: ["main"],
    }),
    new HtmlWebpackPlugin({
      filename: "tema.html",
      template: "./src/tema.html",
      chunks: ["tema"],
    }),
    new CopyPlugin([{ from: "./src/tema/img", to: "img/t/" }]),
    new CleanWebpackPlugin(),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },

      {
        test: /\.s?[ac]ss$/i,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.(woff(2)?|ttf|eot)(\?v=\d+\.\d+\.\d+)?$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
    ],
  },
  devtool: "cheap-module-source-map",
};
