var express = require('express');
var nunjucks = require('nunjucks');
var API = require('./middleware/API');
var app = express();
var env = require('node-env-file');
env('config.env');


nunjucks.configure('views', {
    autoescape: true,
    express: app
});

API(app);

app.set('port', process.env.PORT || 3000)
app.use('/node_modules', express.static('node_modules'));
app.use('/static', express.static('static'));

app.get('/', function(req, res){
  res.render('index.html', {})
});

var server = app.listen(app.get('port'),function(){
	console.log("stating node app..")
});
