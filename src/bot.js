// src/bot.js
const TelegramApi = require('node-telegram-bot-api');
const { token } = require('./config');

const bot = new TelegramApi(token, { polling: true });

module.exports = bot;
