// src/handlers/messageHandler.js
const fs = require('fs');
const path = require('path');
const { getUser, users } = require('../users');
const { sendHallScheme } = require('../messages');
const { getActionKeyboard } = require('../keyboards');
const { pickupOptions } = require('../hall');

// Функция сортировки строк с местами (для /getBookingList)
function sortSeatStringsByRow(seats) {
    return seats.slice().sort((a, b) => {
        const rowA = parseInt(a.match(/Ряд (\d+)/)?.[1] || 0, 10);
        const rowB = parseInt(b.match(/Ряд (\d+)/)?.[1] || 0, 10);
        return rowA - rowB;
    });
}

async function handleMessage(msg, bot) {
    const chatId = msg.chat.id;
    const user = getUser(chatId);
    const text = msg.text;

    if (text === '/start') {
        await bot.sendSticker(chatId, 'https://cdn2.combot.org/siba_oscar/webp/0xf09f918b.webp');
        await bot.sendMessage(chatId, `Здесь ты можешь забронировать места или отменить бронь на концерт *"День Первокурсника"* Института Физики КФУ.\n\n📍Большой зал, КСК УНИКС\n🕓 17:00 10.10.2025`, { parse_mode: "Markdown" });
        await bot.sendMessage(chatId, 'Чтобы продолжить, введи, пожалуйста, свои *Фамилию Имя*', { parse_mode: "Markdown" });
        await bot.sendSticker(chatId, 'https://cdn2.combot.org/siba_oscar/webp/3xf09f98a0.webp');
    } else if (text && text.split(' ').length === 2) {
        user.name = text;
        await bot.sendSticker(chatId, 'https://cdn2.combot.org/siba_oscar/webp/66xf09fa5b0.webp');

        // --- проверка лимита 10 билетов ---
        if (user.selectedSeats.length >= 10) {
            await bot.sendMessage(chatId, '⚠️ У тебя уже выбрано 10 мест. Невозможно выбрать больше билетов.');
        } else {
            await sendHallScheme(bot, chatId, user, { maxSelectableSeats: 10 - user.selectedSeats.length });
        }
        // --- конец проверки ---
    } else if (text === '/getBookingList') {
        let bookingText = '';

        for (const option of pickupOptions) {
            bookingText += `\n🔥${option}\n\n`;

            const bookedUsers = Object.values(users).filter(u => u.pickupOption === option && u.selectedSeats.length);

            if (!bookedUsers.length) {
                bookingText += `   (нет броней)\n\n`;
                continue;
            }

            for (const u of bookedUsers) {
                bookingText += `    ${u.name} {\n`;

                const sortedSeats = sortSeatStringsByRow(u.selectedSeats);

                for (const seat of sortedSeats) {
                    const cleanSeat = seat.replace(/Секция \d+, /, '');
                    bookingText += `        ${cleanSeat}\n`;
                }
                bookingText += `    }\n\n`;
            }
        }

        // await bot.sendMessage(chatId, bookingText.trim());
        // создаём временный файл
        const filePath = path.join(__dirname, 'bookingList.txt');
        fs.writeFileSync(filePath, bookingText.trim());

        await bot.sendDocument(chatId, filePath, {}, { filename: 'BookingList.txt' });

        // удаляем файл после отправки
        fs.unlinkSync(filePath);
    } else {
        let randStickerNumber = Math.floor(Math.random() * 10);
        let neponLink = 'https://cdn2.combot.org/siba_oscar/webp/6xf09f97bf.webp';

        if (randStickerNumber == 0 || randStickerNumber == 1) neponLink = 'https://cdn2.combot.org/siba_oscar/webp/100xf09f9984.webp';
        if (randStickerNumber == 2 || randStickerNumber == 3) neponLink = 'https://cdn2.combot.org/siba_oscar/webp/83xf09fa494.webp';
        if (randStickerNumber == 4 || randStickerNumber == 5) neponLink = 'https://cdn2.combot.org/siba_oscar/webp/48xf09f9982.webp';
        if (randStickerNumber == 6 || randStickerNumber == 7) neponLink = 'https://cdn2.combot.org/siba_oscar/webp/47xf09fa4af.webp';
        if (randStickerNumber == 8 || randStickerNumber == 9) neponLink = 'https://cdn2.combot.org/siba_oscar/webp/6xf09f97bf.webp';

        await bot.sendSticker(chatId, neponLink);

        if (user.name) {
            await bot.sendMessage(chatId, 'Что хочешь сделать дальше?', { reply_markup: getActionKeyboard() });
        } else {
            await bot.sendMessage(chatId, 'Чтобы продолжить, введи, пожалуйста, свои *Фамилию Имя*', { parse_mode: "Markdown" });
        }
    }
}

module.exports = {
    handleMessage
};
