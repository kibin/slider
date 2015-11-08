const webpack = require(`webpack`);
const autoprefixer = require(`autoprefixer`);
const pathToFE = `${__dirname}/src`;

module.exports = {
  devtool: `eval`,
  entry: [
    `webpack-hot-middleware/client`,
    `./src/index`,
  ],
  output: {
    path: `${__dirname}/build)`,
    filename: `app.js`,
    publicPath: `/static/`,
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: [`babel`],
      include: pathToFE,
    }, {
      test: /\.styl$/,
      loader: `style!css!postcss!stylus`,
      include: pathToFE,
    }],
  },
  postcss: [
    autoprefixer({ browsers: [ `last 2 versions` ] }),
  ],
  resolve: {
    root: [
      pathToFE,
    ],
    extentions: [ ``, `js`, `jsx`, `styl` ],
  },
};
