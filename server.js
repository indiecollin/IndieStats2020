import 'babel-polyfill';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router';
require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import App from './src/components/App.jsx';
// import path from 'path';
// import webpackMiddleware from 'webpack-dev-middleware';
// import webpack from 'webpack';
// import webpackConfig from './webpack.config';

const app = express();

app.use(bodyParser.json());
app.use(express.static('dist/public'));

app.get('*', (req, res)=>{
  const context = {};
  const content = ReactDOMServer.renderToString(
    <StaticRouter location = {req.url} context = {context}>
      <App/>
    </StaticRouter>
  );

  const html = `
    <html>
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, intitial-scale=1.0">
        <meta http-equiv="X-UA-Comptaible" content="ie=edge">
        <link href='style.css' rel = 'stylesheet'/>
      </head>
      <body>
        <div id = 'app'>${content}</div>
        <script src='client_bundle.js'></script>        
      </body>
    </html>
  `

  res.send(html);
});

// app.use(webpackMiddleware(webpack(webpackConfig)));
// app.use('/assets', express.static(__dirname + '/public'));
// //.use(express.static('public'))

// app.get('/*', function(req, res) {
//     res.sendFile(path.join(__dirname, './index.html'), function(err) {
//       if (err) {
//         res.status(500).send(err)
//       }
//     })
// });

app.listen(process.env.PORT, () => console.log('Listening on port: ' + process.env.PORT));