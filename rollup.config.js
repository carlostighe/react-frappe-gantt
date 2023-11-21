import babel from "rollup-plugin-babel";
import commonjs from "rollup-plugin-commonjs";
import pkg from "./package.json";
import postcss from "rollup-plugin-postcss";
import resolve from "rollup-plugin-node-resolve";

export default {
  input: "src/main.js",
  output: {
    file: pkg.main,
    format: "cjs",
  },
  external: ["react"],
  plugins: [
    postcss({
      plugins: [],
      minimize: true,
      sourceMap: "inline",
    }),
    babel({
      exclude: "node_modules/**",
    }),
    resolve(),
    commonjs(),
  ],
};
