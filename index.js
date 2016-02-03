var config = require('./config.json');
var mqtt    = require('mqtt');
var client  = mqtt.connect('mqtt://'+config.ip);
var shell = require('shelljs');

client.on('connect', function () {
  console.log("Connected to MQTT broker");
  client.subscribe(config.channel+"-out");
  console.log("Subscribed to "+config.channel+"-out");
});

client.on('message', function (topic, message) {
  // message is Buffer
  switch (message.toString()) {
    case "off":
      //Turn off PC here.
      console.log("Turning off PC.");
      shell.exec('shutdown /s /t 120');
      break;
    case "get":
      client.publish(config.channel+"-in","on");
      console.log("Request: Is PC on?");
      console.log("Answer: Yes!");
      break;
    default:
      console.log(message.toString());
  }

});
