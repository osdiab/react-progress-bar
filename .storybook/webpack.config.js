const path = require("path");
module.exports = {
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader"
      },
      {
        test: /\.css?$/,
        include: path.join(__dirname, ".."),
        use: ["style-loader", "css-loader"]
      }
    ]
  },
  resolve: {
    extensions: [".js", ".json", ".ts", ".tsx"]
  }
};
