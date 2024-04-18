import path from "path";

import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory

const outputConfig = {
  destPath: "./dist",
};

// Entry points
// https://webpack.js.org/concepts/entry-points/
const entryConfig = ["./src/App.ts", "./src/assets/stylesheets/app.scss"];

// Copy files from src to dist
// https://webpack.js.org/plugins/copy-webpack-plugin/
const copyPluginPatterns = {
  patterns: [
    { from: "./src/assets/images", to: "images" },
    { from: "./src/assets/fonts", to: "fonts" },
    { from: "./src/assets/vendor", to: "js" },
  ],
};

// Dev server setup
// https://webpack.js.org/configuration/dev-server/
const devServer = {
  static: {
    directory: path.join(__dirname, outputConfig.destPath),
  },
  // https: true,
  // port: "8080",
  // host: "0.0.0.0",
  // disableHostCheck: true
};

// SCSS compile
const scssConfig = {
  destFileName: "css/app.min.css",
};

// Production terser config options
// https://webpack.js.org/plugins/terser-webpack-plugin/#terseroptions
const terserPluginConfig = {
  extractComments: false,
  terserOptions: {
    compress: {
      drop_console: true,
    },
  },
};

export {
  outputConfig,
  copyPluginPatterns,
  entryConfig,
  scssConfig,
  devServer,
  terserPluginConfig,
};
