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
        var deviceId = req.body.device;
        var registrationId = req.body.token;
        if ( typeof deviceId  == 'undefined' ||  typeof registrationId  == 'undefined' ) {
 
            res.send("parâmetros invalidos");
 
        } else if (!deviceId.trim() || !registrationId.trim() ) {
 
 
            res.send("parâmetro vazio");
 
        } else {
 
            devicesService.storeDevices(deviceId, registrationId, function(result) {
 
                res.json(result);
 
            });
        }
    }
}