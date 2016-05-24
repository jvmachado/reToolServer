var Device = require('../model/deviceSchema');
var request = require('request');
var service = {};
service.storeDevices = storeDevices;
service.getDevices = getDevices;
module.exports = service;

function getDevices (callback){
       
       Device.find({}, {
        _id: false,
        __v: false
    }, function(err, devices) {
            
        if (!err) {
            
            callback(devices)   
        }else {
            callback(err);
        }
        
    });
}

function storeDevices (deviceId,registrationId,callback){
 
    var newDevice = new Device({ 
 
        deviceId : deviceId,
        registrationId : registrationId
    });
 
    Device .find({deviceId : deviceId}, function(err,devices){
 
        var totalDevices = devices.length;
 
        if (totalDevices == 0) {
 
            newDevice.save(function(err){
 
                if (!err) {
                    callback("Salvo!");
 
                } else {
 
                    callback("erro!");
 
                }
            });
        } else {
 
            callback("outro erro!");
 
        }
 
    });
}
