var Indicator = require('../model/indicadoresSchema');

var service = {};
service.findLast20Registers = findLast20Registers;
module.exports = service;

function findLast20Registers(callback){
	Indicator.find().limit(20).sort({$natural:-1}).exec ( function (err, last20Registers){
		if (err){
			callback(err);
		}else{
			callback(last20Registers);
		}
	})
}