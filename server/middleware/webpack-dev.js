
// Dependencies

import express from 'express';
import path from 'path';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackConfig from '../../webpack/webpack.dev';

module.exports = function() {
  const compiler   = webpack(webpackConfig);
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
};
