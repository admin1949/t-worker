import { defineConfig } from "rollup";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonJs from "@rollup/plugin-commonjs";
import typescript2 from "rollup-plugin-typescript2";
import { babel } from "@rollup/plugin-babel";
import { dts } from "rollup-plugin-dts";

export default defineConfig([
  {
    plugins: [
      nodeResolve(),
      typescript2({}),
      babel({
        babelrc: false,
        presets: [["@babel/preset-env", { modules: false, loose: true }]],
        plugins: [["@babel/plugin-proposal-class-properties", { loose: true }]],
        exclude: /node_modules/,
      }),
      commonJs(),
    ],
    external: ["@eric/antv-graph-base", "@eric/antv-vue-shape", "@eric/antv-xmind-layout", /node_modules/],
    input: "./src/index.ts",
    output: [
      { file: "./dist/index.js", format: "cjs" },
      { file: "./dist/index.esm.js", format: "es" },
      { file: "./dist/index.umd.js", format: "umd", name: "t-worker" },
    ],
  },
  {
    input: "./src/index.ts",
    plugins: [dts()],
    output: {
      file: "./dist/index.d.ts",
      format: "esm",
    },
  },
]);
