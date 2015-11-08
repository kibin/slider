const params = require(`./webpack.config`);
const _ = require(`lodash`);
const webpack = require(`webpack`);

module.exports = _.assign(params, {
  devtool: `eval`,
  entry: [
    `webpack-hot-middleware/client`,
    params.entry.app,
  ],
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
  ],
});
