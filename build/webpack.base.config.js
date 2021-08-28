const path = require("path");
// const webpack = require('webpack');
const nodeExternals = require("webpack-node-externals");

const envName = (env) => {
  if (env.production) {
    return "production";
  }
  if (env.test) {
    return "test";
  }
  return "development";
};

const envToMode = (env) => {
  if (env.production) {
    return "production";
  }
  return "development";
};

module.exports = env => {
  return {
    target: "electron-renderer",
    mode: envToMode(env),
    node: {
      __dirname: false,
      __filename: false
    },
    externals: [nodeExternals()],
    resolve: {
      extensions: ['*', '.js', '.jsx'],
      alias: {
        env: path.resolve(__dirname, `../config/env_${envName(env)}.json`)
      }
    },
    devtool: "source-map",
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"]
        },
        {
          test: /\.css$/,
          use: ["style-loader", "css-loader"]
        }
      ]
    // },
    // plugins: [new webpack.HotModuleReplacementPlugin()],
    // devServer: {
    //   contentBase: path.resolve(__dirname, './dist'),
    //   hot: true
    }
  };
};
