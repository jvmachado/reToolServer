var mongoose = require('mongoose');
var Indicador = require("./model/indicadoresSchema");
var Device = require("./model/deviceSchema");
var ionicPushServer = require('ionic-push-server');
var image = "";
var service = {};
service.findLastRegister = findLastRegister;
service.insertIndicator = insertIndicator;
module.exports = service;

function findLastRegister(callback){	
	Indicador.find().limit(1).sort({$natural:-1}).exec(function (err, lastRegister){
		if (err){
			console.log(err);
			callback(err);
		}else{
			console.log(lastRegister[0]);
			callback(lastRegister[0]);
		}
	})	
};

function insertIndicator(callback){
	findLastRegister(function(item){
		console.log("entrou no findLast");
		var valorComparacao=item.valorComparacao;
		var valor =item.valor;
		var corpo = "";
		var tendencia = item.tendencia * (-1);
		
		if(tendencia == 1){
			valorComparacao= valor,
			valor= valor * 1.5,
			corpo= "A loja Retool Praia de belas superou a média de vendas das últimas 4 semanas.";
			image = "http://i.imgur.com/9n1wpSv.png";
		} else{
			valor= valorComparacao * 0.95;
			corpo= "A loja Retool Praia de belas apresentou queda na média de vendas em comparação com as últimas 4 semanas.";
			image= "http://i.imgur.com/SEQ61tw.png";
		}
		var data = new Date();
		var newItem = {
			tipoGrupo: item.tipoGrupo,
			descricaoGrupo: item.descricaoGrupo,
			data: data,
			tendencia: tendencia,
			indicador: item.indicador,
			tipoDadosComparacao: item.tipoDadosComparacao,
			valor: valor,
			valorComparacao: valorComparacao,
			titulo: item.titulo,
			corpo: corpo
		};
		callback(newItem);
		var saveItem = new Indicador(newItem);
		saveItem.save(function (err, data) {
			if (err) console.log("erro");
			else console.log("salvo"); 
		});
	});

	var credentials = {
		IonicApplicationID : "cff0af0a",
		IonicApplicationAPItoken : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiI5NDQyNTM5ZS0xYjE1LTQwMzAtODdkZi0zY2Q0NGU1OWVjMmUifQ.GSSDgXMxLtVG83ofsreogTKwdsHnT2njTxK7VIIIZq8"
	};
	
	function enviaNotificacao(token){
		findLastRegister(function(lastRegister){
			var notification = {
				"tokens": [token],
				"profile": "test",
				"notification": {
					"title": lastRegister.titulo,
					"message": lastRegister.corpo,
					"image": image,
					"android": {
						"data": {
						"title": lastRegister.titulo,
						"message": lastRegister.corpo,
						"image": image,
						"style" : "inbox",
						"summaryText": "há %n% notificações"
					}
					},
					"ios": {
						"title": "Howdy",
						"message": "Hello iOS!"
					} 
				}
			};
			console.log("mandou notificação");
			ionicPushServer(credentials, notification);
		});
		
	};


	Device.count({}, function(err, quantidade){
		if(err){
			console.error("");
		}else{           
			setToken(quantidade);
		}
	});

	function setToken(quantidade){
		Device.find().exec(function(err, notifiacaoMongo){        
			if(err){
				console.error("err");
			}else{
				for(var i = 0; i < quantidade; i++){ 
					enviaNotificacao(notifiacaoMongo[i].registrationId);
				}
			}
		})    
	}
};