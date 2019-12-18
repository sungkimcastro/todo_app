const path = require("path");

module.exports = {
  entry: ["babel-polyfill", "./src/index.js"],
  output: {
    path: path.resolve(__dirname, "public/scripts"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"]
          }
        }
      }
    ]
  },
  devServer: {
    contentBase: path.resolve(__dirname, "public"),
    publicPath: "/scripts/"
  },
  devtool: "source-map"
};

// Now webpack manage babel

// Absolute path
// C:\Users\sj916\Desktop\Sung\javascript\boilerplate\public\scripts

// Node js global variable
// __dirname: Provides the absolute path to the root of the project
// // C:\Users\sj916\Desktop\Sung\javascript\boilerplate\

// const path = require("path")
// require("path"): its a node jslibrary
// const path: its just an object
// path.resolve(): its a method that allow us to combine the absolute path

// devServer:
// contentBase: Takes an absolute path, and serve the folder
// publicPath: Here we tell to the server where to compile our modules
