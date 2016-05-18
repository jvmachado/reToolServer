var express   = require("express");
var open      = require('open');
var mongoose  = require('mongoose');
var populaBanco = require("./popularBanco");
var app       = express();
var info = "";
var num = 4000;

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

//popular o banco
setInterval(function(){
populaBanco.insertIndicator(function(res){
console.log(res);
})},1000*60);
//fim da população do banco

app.listen(num);	

