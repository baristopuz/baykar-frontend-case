const fs = require("fs");
const path = require("path");
// const glob = require("glob");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const WebpackShellPluginNext = require("webpack-shell-plugin-next");
const TerserPlugin = require("terser-webpack-plugin");


let config = {
  watch: true,
  watchOptions: {
    aggregateTimeout: 50,
    ignored: /node_modules/,
  },
  performance: {
    hints: false,
  },
  resolve: {
    modules: [
      path.resolve(__dirname, "node_modules"),
    ],
  },
  optimization: {
    minimize: false,
    minimizer: [
      new TerserPlugin({
        parallel: false,
      }),
    ],
  },
};

jsConfig = Object.assign({}, config, {
  entry: "./src/js/script.js",
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist/js'),
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx|mjs)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
        ],
      },
    ],
  }
});

cssConfig = Object.assign({}, config, {
  entry: "./src/scss/style.scss",
  output: {
    path: path.resolve(__dirname, "dist/css"),
    filename: "[name].bundle-delete.css",
    // clean: true,
  },

  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "fast-sass-loader",
            options: {
              implementation: require("node-sass"),
              sassOptions: {
                outputStyle: "compressed", // İsteğe bağlı: sıkıştırılmış çıktı
                cache: true, // Sass Cache kullanımı
                includePaths: ["./node_modules"],
              },
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new WebpackShellPluginNext({
      onBuildEnd: {
        scripts: [
          () => {
            try {
              fs.unlinkSync(path.resolve(__dirname, "dist/css/main.bundle-delete.css"));
            } catch (err) {
              console.error(err);
            }

          },
        ],
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[name].bundle.css",
    }),
  ],
});


module.exports = [jsConfig, cssConfig];
