import "core-js/stable";
import "regenerator-runtime/runtime";
import 'core-js/features/array/fill';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import {StaticRouter} from 'react-router';
require('dotenv').config();
import express from 'express';
import Loadable from 'react-loadable';
import { getBundles } from 'react-loadable-ssr-addon';
import bodyParser from 'body-parser';
import App from './src/components/main/App.jsx';
import importerController from './api/controllers/importer';
import playersController from './api/controllers/players';
import tournamentsController from './api/controllers/tournaments';

const app = express();
const manifest = require('./dist/react-loadable-ssr-addon.json');

app.use(bodyParser.json());
app.use(express.static('dist/public'));
app.use('/api', importerController);
app.use('/api', playersController);
app.use('/api', tournamentsController);

app.get('*', (req, res)=>{
  const context = {};  
  const modules = new Set();
  const content = ReactDOMServer.renderToString(
    <Loadable.Capture report={moduleName => modules.add(moduleName)}>
      <StaticRouter location = {req.url} context = {context}>
        <App/>
      </StaticRouter>
    </Loadable.Capture>
  );
  const bundles = getBundles(manifest, [...manifest.entrypoints, ...Array.from(modules)]);
  const styles = bundles.css || [];
  const scripts = bundles.js || [];

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <title>Smash Stats</title>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, intitial-scale=1.0">
        <meta http-equiv="X-UA-Comptaible" content="ie=edge">
        <base href="/">
        ${styles.map(style => {
          return `<link href="${style.file}" rel="stylesheet" />`;
        }).join('\n')}
      </head>
      <body class = 'preload' style = 'background-color: #EEEEEE;'>
        <div id = 'app' style = 'visibility: hidden;min-height: 100vh;'>${content}</div>
        <div id="modal-root"></div>
        ${scripts.map(script => {
          return `<script src="${script.file}"></script>`
        }).join('\n')}    
      </body>
    </html>
  `;

  res.send(html);
});

Loadable.preloadAll()
.then(() => {app.listen(process.env.PORT, () => {console.log('Listening on port: ' + process.env.PORT)})})
.catch(err => {console.log(err)});