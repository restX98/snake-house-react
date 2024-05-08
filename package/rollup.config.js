import path from "path";

import alias from "@rollup/plugin-alias";
import babel from "@rollup/plugin-babel";
import resolve from "@rollup/plugin-node-resolve";
// import terser from "@rollup/plugin-terser";
import postcss from "rollup-plugin-postcss";
import { rollupPluginUseClient } from "rollup-plugin-use-client";
import { rimraf } from "rimraf";

const entries = ["src/index.js"];
const outputDir = "dist";

const external = ["react/jsx-runtime", "react", "react-dom", "tailwindcss"];

/**
 * @type {import('rollup').RollupOptions}
 */
export default {
  input: entries,
  output: [
    {
      format: "es",
      dir: `${outputDir}/esm`,
      entryFileNames: "[name].mjs",
      preserveModules: true,
      sourcemap: true,
    },
    {
      format: "cjs",
      dir: `${outputDir}/cjs`,
      entryFileNames: "[name].cjs",
      preserveModules: true,
      sourcemap: true,
    },
  ],
  external,
  plugins: [
    cleanOutputDir(),
    alias({
      entries: [
        {
          find: "@",
          replacement: path.resolve("src"),
        },
      ],
    }),
    resolve({
      browser: true,
      preferBuiltins: false,
      extensions: [".js", ".jsx", ".json"],
    }),
    postcss({
      config: {
        path: "./postcss.config.js",
      },
      extensions: [".css"],
      minimize: true,
      inject: {
        insertAt: "top",
      },
    }),
    rollupPluginUseClient(),
    babel({
      babelHelpers: "bundled",
      presets: [
        "@babel/preset-env",
        [
          "@babel/preset-react",
          {
            runtime: "automatic",
          },
        ],
      ],
      extensions: [".js", ".jsx", ".json", "css", "mjs"],
      exclude: "node_modules/**",
      sourceMaps: true,
    }),
    // terser(),
  ],
  onwarn(warning, warn) {
    if (warning.code === "MODULE_LEVEL_DIRECTIVE") {
      return;
    }
    warn(warning);
  },
};

function cleanOutputDir() {
  return {
    name: "clean-output-dir",
    async buildStart() {
      await rimraf(outputDir);
    },
  };
}
