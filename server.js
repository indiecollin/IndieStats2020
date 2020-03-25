require('dotenv').config();
const express = require('express');
const path = require('path');
const webpackMiddleware = require('webpack-dev-middleware');
const webpack = require('webpack');
const webpackConfig = require('./webpack.config');

const app = express();

app.use(webpackMiddleware(webpack(webpackConfig)));
app.use('/assets', express.static(__dirname + '/public'));
//.use(express.static('public'))

app.get('/*', function(req, res) {
    res.sendFile(path.join(__dirname, './index.html'), function(err) {
      if (err) {
        res.status(500).send(err)
      }
    })
});

app.listen(process.env.PORT, () => console.log('Listening on port: ' + process.env.PORT));