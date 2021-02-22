const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  mode: "production",
  entry: {
    background: "./src/background/index.ts",
    content: "./src/content/index.tsx",
    newtab: "./src/newtab/index.tsx",
    popup: "./src/popup/index.tsx",
  },
  watch: true,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: "newtab.html",
      inject: "body",
      template: "./src/index.html",
      chunks: ["newtab"],
    }),
    new HtmlWebpackPlugin({
      filename: "popup.html",
      inject: "body",
      template: "./src/index.html",
      chunks: ["popup"],
    }),
  ],
};
