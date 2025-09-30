// src/messages.js
const { calculateSections } = require('./hall');
const path = require('path');

async function sendHallScheme(bot, chatId, user) {
    if (user.lastSchemeMsgId) {
        try { await bot.deleteMessage(chatId, user.lastSchemeMsgId); } catch (e) { }
    }

    const sections = calculateSections();

    const sectionButtons = Object.keys(sections).map(secId => ({
        text: `${secId} - ${sections[secId]} мест`,
        callback_data: secId
    }));

    const keyboard = [];
    for (let i = 0; i < sectionButtons.length; i += 3) {
        keyboard.push(sectionButtons.slice(i, i + 3));
    }

    const imagePath = path.join(__dirname, 'hall-layout.png');

    const sentMsg = await bot.sendPhoto(chatId, imagePath, {
        caption: `Выбери секцию, в которой хочешь занять место.`,
        reply_markup: { inline_keyboard: keyboard }
    });

    user.lastSchemeMsgId = sentMsg.message_id;
}

module.exports = {
    sendHallScheme
};
