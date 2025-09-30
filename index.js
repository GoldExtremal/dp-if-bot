const TelegramApi = require('node-telegram-bot-api');
const { log } = require('node:console');
const token = '';

const bot = new TelegramApi(token, { polling: true });

bot.on('message', msg => {
    
})