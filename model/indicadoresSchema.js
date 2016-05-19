//creating a new module with the system schemas
var mongoose = require('mongoose');
indicadoresSchema = new mongoose.Schema({
	tipoGrupo: String,
	descricaoGrupo: String,
	data: Date,
	tendencia: Number,
	indicador: String,
	tipoDadosComparacao: String,
	valor: Number,
	valorComparacao: Number,
	titulo:String,
	corpo:String
});

module.exports = mongoose.model('indicadores', indicadoresSchema);