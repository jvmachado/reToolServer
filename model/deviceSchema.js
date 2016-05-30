var mongoose = require('mongoose');
 
 
var deviceSchema = mongoose.Schema({ 
    deviceId      : { type: String, index: { unique: false }},
    registrationId  :{ type: String, index: { unique: true }}
});
 
var Device = mongoose.model('device', deviceSchema);
module.exports= Device;