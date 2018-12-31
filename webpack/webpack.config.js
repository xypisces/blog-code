const path = require("path")

module.exports = {
  mode: "production",
  entry: {
    app: './unpack-js/app.js'
  },
  output: {
    publicPath: __dirname + "/dist/",
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  }
}