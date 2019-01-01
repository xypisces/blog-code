const path = require("path")

module.exports = {
  mode: "production",
  entry: {
    app: './src/index.js'
  },
  output: {
    publicPath: __dirname + "/dist/",
    path: path.resolve(__dirname, "dist"),
    filename: "index.js"
  },
  module:{
    rules:[{
      test: /\.css$/,
      use:[
        'style-loader',
        'css-loader'
      ]
    }]
  }
}