const {
  MessageEmbed
} = require('discord.js');
const moment = require("moment");
const config = require("../botconfig/config.json");

module.exports = async (client) => {


  client.logger = (data) => {

    let logstring = `${String(`FaZi Chodder`).brightGreen}${` | `.grey}${`${moment().format("ddd DD-MM-YYYY HH:mm:ss.SSSS")}`.cyan}${` 〢 `.magenta}`
    if (typeof data == "string") {
      console.log(logstring, data.split("\n").map(d => `${d}`.green).join(`\n${logstring} `))
    } else if (typeof data == "object") {
      console.log(logstring, JSON.stringify(data, null, 3).green)
    } else if (typeof data == "boolean") {
      console.log(logstring, String(data).cyan)
    } else {
      console.log(logstring, data)
    }
  };

}