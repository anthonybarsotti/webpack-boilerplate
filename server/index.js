
// Dependencies
import express from 'express';
import path from 'path';

// Constants
const app = express();
const isProd = process.env.NODE_ENV === 'production';
const port = process.env.PORT || 8080;

// Use webpack dev middleware if necessary
if (!isProd) {
  const webpackDevMiddleware = require('./middleware/webpack-dev');

  app.use(webpackDevMiddleware(app));
} else {
  app.use('/assets', express.static(path.join(process.cwd(), 'client')));
  app.get('*', (req, res) => res.sendFile(path.join(process.cwd(), 'client', 'index.html')));
}

app.listen(port, error => {
  if (error) {
    console.log(error.message);
  } else {
    console.log(`App listening on port ${port}`);
  }
});
