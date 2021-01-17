require('dotenv').config()

const Discord = require('discord.js');
const logger = require('winston');
const tokenDiscord = process.env.DISCORD_TOKEN;
const fs = require('fs');

const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

// Initialize Discord Bot
var client = new Discord.Client();
fs.readdir('./events/', (err, files) => {
  files.forEach(file => {
    const eventHandler = require(`./events/${file}`)
    const eventName = file.split('.')[0]
    client.on(eventName, (...args) => eventHandler(client, ...args))
  })
})


logger.info('Standby');
client.login(tokenDiscord);
client.on('ready', () => {
  console.info(`Logged in as ${client.user.tag}!`);
})
