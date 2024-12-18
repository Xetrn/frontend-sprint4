const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

// import jordanImage from "./images/jordan.jpg";
// import avatar from "./images/avatar.jpg";
// import logo from "./images/logo.svg";

// const whoIsTheGoat = [
//   // меняем исходные пути на переменные
//   { name: "Michael Jordan", link: jordanImage },
//   { name: "Lebron James", link: jamesImage },
//   { name: "Kobe Bryant", link: bryantImage },
// ];

module.exports = {
  entry: { main: "./src/scripts/index.js" },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "main.js",
    clean: true,
    publicPath: "",
  },
  mode: "development",
  devServer: {
    static: path.resolve(__dirname, "./dist"),
    compress: true, // ускорение сборки
    port: 8080,

    open: true, // авто открытие
  },
  module: {
    rules: [
      {
        test: /\.js$/, // HTML
        use: "babel-loader",
        exclude: "/node_modules/",
      },
      {
        test: /\.(png|jpe?g|gif|svg|woff(2)?|eot|ttf|otf)$/, // IMAGES AND FONTS
        type: "asset/resource",
        generator: {
          filename: 'images/[name].[ext]', // Output images to /images/ folder
        },
      },
      {
        test: /\.css$/, // CSS
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: "css-loader",
            options: { importLoaders: 1 },
          },
          "postcss-loader",
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // путь к файлу index.html
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin(),
  ],
};
