const config = require(`./webpack.config.dev`);
const app = require(`express`)();
const compiler = require(`webpack`)(config);

app.use(require(`webpack-dev-middleware`)(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath,
  stats: {
    colors: true
  },
}));

app.use(require(`webpack-hot-middleware`)(compiler));

app.get(`*`, (req, res) => {
  res.sendFile(`${__dirname}/index.html`);
});

app.listen(3000, `localhost`, (err) => {
  if (err) return console.error(err);

  console.info(`Listening at http://localhost:3000`);
});
