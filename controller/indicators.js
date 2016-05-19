var express = require('express');
var indicatorsService = require('../service/indicators');

module.exports = {
         findLast20Registers:function (req, res, next) {
            indicatorsService.findLast20Registers(function(indicator){
                   res.json(indicator);                
            });
        
        }
}