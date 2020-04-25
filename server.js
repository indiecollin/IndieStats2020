import 'babel-polyfill';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router';
require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import App from './src/components/App.jsx';

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
        <title>Smash Stats</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, intitial-scale=1.0">
        <meta http-equiv="X-UA-Comptaible" content="ie=edge">
        <link href='style.css' rel = 'stylesheet'/>
      </head>
      <body class = 'preload' style = 'background-color: #EEEEEE;'>
        <div id = 'app' style = 'visibility: hidden;'>${content}</div>
        <div id="modal-root"></div>
        <script src='client_bundle.js'></script>        
      </body>
    </html>
  `;

  res.send(html);
});

app.listen(process.env.PORT, () => console.log('Listening on port: ' + process.env.PORT));