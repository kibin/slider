const webpack = require(`webpack`);
const autoprefixer = require(`autoprefixer`);
const pathToFE = `${__dirname}/src`;

module.exports = {
  entry: {
    app: `./src/index`
  },
  output: {
    path: `${__dirname}/dist`,
    filename: `app.js`,
    publicPath: `/dist/`,
  },
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
