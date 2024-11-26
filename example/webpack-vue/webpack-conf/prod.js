const { merge } = require("webpack-merge");
const common = require("./common");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { resolve } = require("node:path");

const notCopys = [
  resolve("./public/index.html")
];

module.exports = merge(common, {
  mode: "production",
  output: {
    clean: true,
  },
  plugins: [
    new CopyWebpackPlugin({
      patterns: [
        {
          from: resolve("./public"), to: resolve("./dist"), filter: (f) => {
            return !notCopys.includes(f);
          }
        }
      ],
    }),
  ],
});
