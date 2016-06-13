
// Dependencies
const express = require('express');
const path = require('path');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackConfig = require('../../webpack/webpack.dev');

module.exports = () => {
  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    silent: true,
    stats: 'errors-only',
  });
  const fs = middleware.fileSystem;
  const app = express();

  app.use(middleware);

  app.get('*', (req, res) => {
    const file = fs.readFileSync(path.join(webpackConfig.output.path, 'index.html'));
    res.send(file.toString());
  });

  return app;
}
