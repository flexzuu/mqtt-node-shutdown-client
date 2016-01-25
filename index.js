var config = require('./config.json');
var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://'+config.ip);

client.on('connect', function () {
  client.subscribe(config.channel+"-out");
});

client.on('message', function (topic, message) {
  // message is Buffer
  switch (message) {
    case "off":
      //Turn off PC here.
      console.log("Turning off PC.");
      break;
    case "get":
      client.publish(config.channel+"-in","on");
      break;
    default:
      break;
  }
  console.log(message.toString());
});
