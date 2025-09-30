// index.js — точка входа
require('dotenv').config();
const { token } = require('./src/config');
const bot = require('./src/bot');
const messageHandler = require('./src/handlers/messageHandler');
const callbackHandler = require('./src/handlers/callbackHandler');

console.log('Bot starting...');

// Обрабатываем сообщения
bot.on('message', async (msg) => {
    try {
        await messageHandler.handleMessage(msg, bot);
    } catch (err) {
        console.error('Error in message handler:', err);
    }
});

// Обрабатываем callback_query
bot.on('callback_query', async (query) => {
    try {
        await callbackHandler.handleCallback(query, bot);
    } catch (err) {
        console.error('Error in callback handler:', err);
    }
});
