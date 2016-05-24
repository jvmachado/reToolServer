var express   = require("express");
var open      = require('open');
var mongoose  = require('mongoose');
var ionicPushServer = require('ionic-push-server');
var populaBanco = require("./popularBanco.js");
var app       = express();
var bodyParser = require('body-parser');
var info = "";
var num = 4000;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

//PERMITE ACESSO
app.use(function(req, res, next){
	res.append('Access-Control-Allow-Origin', req.headers.origin || '*');
	res.append('Access-Control-Allow-Credentials', 'true');
	res.append('Access-Control-Allow-Methods', ['GET', 'OPTIONS', 'PUT', 'POST']);
	res.append('Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept');
	next();
});

//db connection
mongoose.connect('mongodb://localhost/retool');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

console.log("ta aqui");
app.use('/',require('./routes'));
//popular o banco
setInterval(function(){
console.log("ta aqui agora");	
	populaBanco.insertIndicator(function(res){
		console.log("entrou");
	});
}, 1000*10);
//fim da população do banco


app.listen(num);