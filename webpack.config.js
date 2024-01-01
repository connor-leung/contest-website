const webpack = require("webpack")
//like import webpack but require is dynamic

module.exports = {
  devtool: 'source-map',
  entry: "./src/index.tsx",
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: {
          loader: "ts-loader",
        },
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({
      HOST: "localhost",
      PORT: "8080"
    })
  ]
  
};
