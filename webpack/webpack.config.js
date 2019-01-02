const path = require("path")

module.exports = {
  mode: "production",
  entry: {
    app: './src/index.js',
    print: './src/print.js'
  },
  output: {
    publicPath: __dirname + "/dist/",
    path: path.resolve(__dirname, "dist"),
    filename: "[name].bundle.js"
  },
  module:{
    rules:[{
      test: /\.css$/,
      use:[
        'style-loader',
        'css-loader'
      ]
    },{
      test: /\.(png|svg|jpg|gif)$/,
      use:['file-loader']
    }]
  }
}