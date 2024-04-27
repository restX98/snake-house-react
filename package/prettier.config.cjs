const rootPrettier = require("../prettier.config.cjs");

/** @type {import('prettier').Config} */
module.exports = {
  ...rootPrettier,
  plugins: [...rootPrettier.plugins, "prettier-plugin-tailwindcss"],
  tailwindFunctions: ["cn"],
};
