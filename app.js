/*
# Copyright (C) CampusIoT,  - All Rights Reserved
# Written by CampusIoT Dev Team, 2016-2018
# Authors: Didier Donsez, Vivien Quéma
 */

/*
 * MQTT LOGGER.
 */

// Retrieve the settings
var SETTINGS = require('./settings.json');

const ID = SETTINGS.id;
const NAME = SETTINGS.name;
const ENV = SETTINGS.env;

const DEBUG = SETTINGS.loglevel.debug;
const INFO = SETTINGS.loglevel.info;
const ERROR = SETTINGS.loglevel.error;

const MQTT = SETTINGS.mqtt;


// ===========================================================================
// Init Global Variables
// ===========================================================================

var boot_time = Date.now();

// ===========================================================================
// Setup MQTT clients
// ===========================================================================

var mqtt = require('mqtt');

function createMqttClient(cfg) {

  var mqttTopic = cfg.mqttTopic;

  var s = (new Date).getTime();
  var mqttClientId = cfg.mqttClientIdPrefix + Math.floor(Math.random(s) * (9999999 - 1111111 + 1) + 1111111);
  cfg.mqttOptions.clientId=mqttClientId;

  // Connect to the MQTT broker.
  console.log(Date.now()+",MQTT:CONNECTING,"+cfg.name);

  var mqttClient = mqtt.connect(cfg.mqttClientUrl, cfg.mqttOptions);

  mqttClient.on("message",
      function (topic, message, mqttpacket) {
        processMqttMessage(topic, message);
    }
  );

  mqttClient.on("connect",
    function () {
      console.log(Date.now()+",MQTT:CONNECTED,"+cfg.name);
      if(mqttTopic !== null) {
        mqttClient.subscribe(mqttTopic);
        console.log(Date.now()+",MQTT:SUBCRIBE,"+cfg.name);
      }
    }
  );

  mqttClient.on("error",
    function (error) {
      console.log(Date.now()+",MQTT:ERROR,"+cfg.name);
    }
  );

  mqttClient.on("close",
    function () {
      console.log(Date.now()+",MQTT:CLOSE,"+cfg.name);
    }
  );

  mqttClient.on("offline",
    function () {
      console.log(Date.now()+",MQTT:OFFLINE,"+cfg.name);
    }
  );
}

function processMqttMessage(topic, message) {
    var asciiMessage = message.toString('ascii');
    console.log(Date.now()+",MSG,"+topic+","+asciiMessage);
}

function startupMqttClient() {
    // Config parameters (given in file settings.json)
    MQTT.forEach(function(config) {
      createMqttClient(config);
    });
};

startupMqttClient();
