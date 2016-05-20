var express = require('express');
var http = require('http');
var devicesService = require('../service/devices');

module.exports = {

getDevices:function (req, res, next) {
   
    devicesService.getDevices(function (device) {
            if (device) {
                res.json(device);
            } else {
                res.sendStatus(404);
            }
        })

    },
    
    storeDevices:function(req,res,next){
        console.log("oq ta vindo: "+req.body.token);
        var deviceId = req.body.device;
        var registrationId = req.body.token;
        console.log("é aqui que ta essa merda: "+req.body.device);
        console.log(req.body.token);
        if ( typeof deviceId  == 'undefined' ||  typeof registrationId  == 'undefined' ) {
 
            console.log("parâmetros invalidos");
 
            res.send("parâmetros invalidos");
 
        } else if (!deviceId.trim() || !registrationId.trim() ) {
 
            console.log("parâmetro vazio");
 
            res.send("parâmetro vazio");
 
        } else {
 
            devicesService.storeDevices(deviceId, registrationId, function(result) {
 
                res.json(result);
 
            });
        }
    }
}