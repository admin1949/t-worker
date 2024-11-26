const { resolve } = require("path");
const { merge } = require("webpack-merge");
const common = require("./common");

module.exports = merge(common, {
  devServer: {
    static: {
      directory: resolve("./public"),
    },
    compress: true,
    port: 9000,
    hot: true,
  },
  mode: "development",
});
