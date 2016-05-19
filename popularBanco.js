var mongoose = require('mongoose');
var Indicador = require("./model/indicadoresSchema");

var service = {};
service.findLastRegister = findLastRegister;
service.insertIndicator = insertIndicator;
module.exports = service;

function findLastRegister(callback){
	Indicador.find().limit(1).sort({$natural:-1}).exec ( function (err, lastRegister){
		if (err){
			console.log(err);
			callback(err);
		}else{
			callback(lastRegister[0]);
		}
	})	
}

function insertIndicator(callback){
	findLastRegister(function(item){
		var valorComparacao=item.valorComparacao;
		var valor =item.valor;
		var corpo = "";
		var tendencia = item.tendencia * (-1);
		if(tendencia == 1){
			valorComparacao= valor,
			valor= valor * 1.05,
			corpo= "A loja Retool Praia de belas superou a média de vendas das últimas 4 semanas.";
		} else{
			valor= valorComparacao * 0.95;
			corpo= "A loja Retool Praia de belas apresentou queda na média de vendas em comparação com as últimas 4 semanas.";
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
		}
		var saveItem = new Indicador(newItem);
		saveItem.save(function (err, data) {
			if (err) console.log(err);
			else console.log('Saved : ', data ); 
		});

	});

	}