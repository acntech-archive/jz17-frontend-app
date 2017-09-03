const express = require('express');
const axios = require('axios');
const async = require('async');
const yaml = require('js-yaml');
const fs = require('fs');
const bodyParser = require('body-parser');
const favicon = require('serve-favicon');
const todos = require('./todos')


var app = new express();
app.set('view engine', 'pug')
app.use(express.static('public'))
app.use(favicon(__dirname + '/public/images/favicon.png'));
app.use(bodyParser.urlencoded({extended: true}));

var config = undefined;
loadConfig();

app.get('/', function(req, res) {

  todos.fetch(config, function (err, todos) {
    if (err) {
      res.status(500).send('SKjedde noe galt under henting av todos');
      return;
    }

    res.render('index', { todos });
  });
});

app.post('/todos/add', function (req, res) {
  var params = req.body;
  todos.add(config, params, function(err) {
    if (err) {
      res.status(500).send('Kunne ikke legge til ny todo');
      return;
    }

    res.redirect('/');
  });
});

function loadConfig() {
  try {
    console.log("INFO: Laster config fra app-config.yml")
    config = yaml.safeLoad(fs.readFileSync(__dirname + '/app-config.yml', 'utf8'));
  } catch (e) {
    console.log("ERROR: Lasting av app-config feilet!");
    console.log(e);
  }
}

app.listen(3000, function () {
  console.log('Application listening on port 3000!')
})