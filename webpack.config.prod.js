const params = require(`./webpack.config`);
const _ = require(`lodash`);
const webpack = require(`webpack`);

module.exports = _.assign(params, {
  devtool: null,
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      comments: /[^\s\S]/,
    }),
    new webpack.optimize.DedupePlugin()
  ],
});
