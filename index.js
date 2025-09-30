const token = '';

const TelegramApi = require('node-telegram-bot-api');
const bot = new TelegramApi(token, { polling: true });

// Хранилище пользователей
const users = {};

function getUser(chatId) {
    if (!users[chatId]) {
        users[chatId] = {
            id: chatId,
            name: '',
            selectedSeats: [],
            pickupOption: null,
            lastSchemeMsgId: null
        };
    }
    return users[chatId];
}

// Структура зала
let hall = {
    1: {
        name: "", rows: {
            7: [{ number: 1, status: "✅" }, { number: 2, status: "✅" }, { number: 3, status: "✅" }, { number: 4, status: "✅" }],
            8: [{ number: 1, status: "✅" }, { number: 2, status: "✅" }, { number: 3, status: "✅" }, { number: 4, status: "✅" }],
            9: [{ number: 1, status: "✅" }, { number: 2, status: "✅" }, { number: 3, status: "✅" }, { number: 4, status: "✅" }],
            10: [{ number: 1, status: "✅" }, { number: 2, status: "✅" }, { number: 3, status: "✅" }, { number: 4, status: "✅" }],
            11: [{ number: 1, status: "✅" }, { number: 2, status: "✅" }, { number: 3, status: "✅" }, { number: 4, status: "✅" }],

        }
    },
    2: {
        name: "", rows: {
            2: [{ number: 1, status: "✅" }, { number: 2, status: "✅" }, { number: 3, status: "✅" }, { number: 4, status: "✅" }],
            3: [{ number: 1, status: "✅" }, { number: 2, status: "✅" }, { number: 3, status: "✅" }, { number: 4, status: "✅" }],
            4: [{ number: 1, status: "✅" }, { number: 2, status: "✅" }, { number: 3, status: "✅" }, { number: 4, status: "✅" }],
            5: [{ number: 1, status: "✅" }, { number: 2, status: "✅" }, { number: 3, status: "✅" }, { number: 4, status: "✅" }],
            6: [{ number: 1, status: "✅" }, { number: 2, status: "✅" }, { number: 3, status: "✅" }, { number: 4, status: "✅" }],
            7: [{ number: 5, status: "✅" }, { number: 6, status: "✅" }, { number: 7, status: "✅" }, { number: 8, status: "✅" },],
            8: [{ number: 5, status: "✅" }, { number: 6, status: "✅" }, { number: 7, status: "✅" }, { number: 8, status: "✅" },],
            9: [{ number: 5, status: "✅" }, { number: 6, status: "✅" }, { number: 7, status: "✅" }, { number: 8, status: "✅" },],
            10: [{ number: 5, status: "✅" }, { number: 6, status: "✅" }, { number: 7, status: "✅" }, { number: 8, status: "✅" },],
            11: [{ number: 5, status: "✅" }, { number: 6, status: "✅" }, { number: 7, status: "✅" }, { number: 8, status: "✅" },],
        }
    },
    3: {
        name: "", rows: {
            2: [{ number: 5, status: "✅" }, { number: 6, status: "✅" }, { number: 7, status: "✅" }],
            3: [{ number: 5, status: "✅" }, { number: 6, status: "✅" }, { number: 7, status: "✅" }],
            4: [{ number: 5, status: "✅" }, { number: 6, status: "✅" }, { number: 7, status: "✅" }],
            5: [{ number: 5, status: "✅" }, { number: 6, status: "✅" }, { number: 7, status: "✅" }],
            6: [{ number: 5, status: "✅" }, { number: 6, status: "✅" }, { number: 7, status: "✅" }],
            7: [{ number: 9, status: "✅" }, { number: 10, status: "✅" }, { number: 11, status: "✅" }],
            8: [{ number: 9, status: "✅" }, { number: 10, status: "✅" }, { number: 11, status: "✅" }],
            9: [{ number: 9, status: "✅" }, { number: 10, status: "✅" }, { number: 11, status: "✅" }],
            10: [{ number: 9, status: "✅" }, { number: 10, status: "✅" }, { number: 11, status: "✅" }],
            11: [{ number: 9, status: "✅" }, { number: 10, status: "✅" }, { number: 11, status: "✅" }],
        }
    },
    4: {
        name: "", rows: {
            2: [{ number: 20, status: "✅" }, { number: 21, status: "✅" }, { number: 22, status: "✅" }, { number: 23, status: "✅" }],
            3: [{ number: 20, status: "◼️" }, { number: 21, status: "✅" }, { number: 22, status: "✅" }, { number: 23, status: "✅" }],
            4: [{ number: 20, status: "✅" }, { number: 21, status: "✅" }, { number: 22, status: "✅" }, { number: 23, status: "✅" }],
            5: [{ number: 20, status: "✅" }, { number: 21, status: "✅" }, { number: 22, status: "✅" }, { number: 23, status: "✅" }],
            6: [{ number: 20, status: "✅" }, { number: 21, status: "✅" }, { number: 22, status: "✅" }, { number: 23, status: "✅" }],
            7: [{ number: 24, status: "✅" }, { number: 25, status: "✅" }, { number: 26, status: "✅" }, { number: 27, status: "✅" },],
            8: [{ number: 24, status: "✅" }, { number: 25, status: "✅" }, { number: 26, status: "✅" }, { number: 27, status: "✅" },],
            9: [{ number: 24, status: "✅" }, { number: 25, status: "✅" }, { number: 26, status: "✅" }, { number: 27, status: "✅" },],
            10: [{ number: 24, status: "✅" }, { number: 25, status: "✅" }, { number: 26, status: "✅" }, { number: 27, status: "✅" },],
        }
    },
    5: {
        name: "", rows: {
            2: [{ number: 24, status: "✅" }, { number: 25, status: "✅" }, { number: 26, status: "✅" }, { number: 27, status: "✅" }],
            3: [{ number: 24, status: "✅" }, { number: 25, status: "✅" }, { number: 26, status: "✅" }, { number: 27, status: "✅" }],
            4: [{ number: 24, status: "✅" }, { number: 25, status: "✅" }, { number: 26, status: "✅" }, { number: 27, status: "✅" }],
            5: [{ number: 24, status: "✅" }, { number: 25, status: "✅" }, { number: 26, status: "✅" }, { number: 27, status: "✅" }],
            6: [{ number: 24, status: "✅" }, { number: 25, status: "✅" }, { number: 26, status: "✅" }, { number: 27, status: "✅" }],
            7: [{ number: 28, status: "✅" }, { number: 29, status: "✅" }, { number: 30, status: "✅" }, { number: 31, status: "✅" },],
            8: [{ number: 28, status: "✅" }, { number: 29, status: "✅" }, { number: 30, status: "✅" }, { number: 31, status: "✅" },],
            9: [{ number: 28, status: "✅" }, { number: 29, status: "✅" }, { number: 30, status: "✅" }, { number: 31, status: "✅" },],
            10: [{ number: 28, status: "✅" }, { number: 29, status: "✅" }, { number: 30, status: "✅" }, { number: 31, status: "✅" },],
        }
    },
    6: {
        name: "", rows: {
            2: [{ number: 28, status: "✅" }, { number: 29, status: "✅" }, { number: 30, status: "✅" }, { number: 31, status: "✅" }],
            3: [{ number: 28, status: "✅" }, { number: 29, status: "✅" }, { number: 30, status: "✅" }, { number: 31, status: "✅" }],
            4: [{ number: 28, status: "✅" }, { number: 29, status: "✅" }, { number: 30, status: "✅" }, { number: 31, status: "✅" }],
            5: [{ number: 28, status: "✅" }, { number: 29, status: "✅" }, { number: 30, status: "✅" }, { number: 31, status: "✅" }],
            6: [{ number: 28, status: "✅" }, { number: 29, status: "✅" }, { number: 30, status: "✅" }, { number: 31, status: "✅" }],
            7: [{ number: 32, status: "✅" }, { number: 33, status: "✅" }, { number: 34, status: "✅" }, { number: 35, status: "✅" }],
            8: [{ number: 32, status: "✅" }, { number: 33, status: "✅" }, { number: 34, status: "✅" }, { number: 35, status: "✅" }],
            9: [{ number: 32, status: "✅" }, { number: 33, status: "✅" }, { number: 34, status: "✅" }, { number: 35, status: "✅" }],
            10: [{ number: 32, status: "✅" }, { number: 33, status: "✅" }, { number: 34, status: "✅" }, { number: 35, status: "✅" }],
        }
    },
    7: {
        name: "", rows: {
            14: [{ number: 8, status: "✅" }, { number: 9, status: "✅" }, { number: 10, status: "✅" }, { number: 11, status: "✅" }],
            15: [{ number: 8, status: "✅" }, { number: 9, status: "✅" }, { number: 10, status: "✅" }, { number: 11, status: "✅" }],
            16: [{ number: 8, status: "✅" }, { number: 9, status: "✅" }, { number: 10, status: "✅" }, { number: 11, status: "✅" }],
            17: [{ number: 8, status: "✅" }, { number: 9, status: "✅" }, { number: 10, status: "✅" }, { number: 11, status: "✅" }],
            18: [{ number: 8, status: "✅" }, { number: 9, status: "✅" }, { number: 10, status: "✅" }, { number: 11, status: "✅" }],
            19: [{ number: 13, status: "✅" }, { number: 14, status: "✅" }, { number: 15, status: "✅" }, { number: 16, status: "✅" }],
            20: [{ number: 13, status: "✅" }, { number: 14, status: "✅" }, { number: 15, status: "✅" }, { number: 16, status: "✅" }],
            21: [{ number: 13, status: "✅" }, { number: 14, status: "✅" }, { number: 15, status: "✅" }, { number: 16, status: "✅" }],
            22: [{ number: 12, status: "✅" }, { number: 13, status: "✅" }, { number: 14, status: "✅" }, { number: 15, status: "✅" }],
            23: [{ number: 11, status: "✅" }, { number: 12, status: "✅" }, { number: 13, status: "✅" }, { number: 14, status: "✅" }],
            24: [{ number: 10, status: "✅" }, { number: 11, status: "✅" }, { number: 12, status: "✅" }, { number: 13, status: "✅" }],
        }
    },
    8: {
        name: "", rows: {
            14: [{ number: 12, status: "✅" }, { number: 13, status: "✅" }, { number: 14, status: "✅" }, { number: 15, status: "✅" }],
            15: [{ number: 12, status: "✅" }, { number: 13, status: "✅" }, { number: 14, status: "✅" }, { number: 15, status: "✅" }],
            16: [{ number: 12, status: "✅" }, { number: 13, status: "✅" }, { number: 14, status: "✅" }, { number: 15, status: "✅" }],
            17: [{ number: 12, status: "✅" }, { number: 13, status: "✅" }, { number: 14, status: "✅" }, { number: 15, status: "✅" }],
            18: [{ number: 12, status: "✅" }, { number: 13, status: "✅" }, { number: 14, status: "✅" }, { number: 15, status: "✅" }],
            19: [{ number: 17, status: "✅" }, { number: 18, status: "✅" }, { number: 19, status: "✅" }, { number: 20, status: "✅" }],
            20: [{ number: 17, status: "✅" }, { number: 18, status: "✅" }, { number: 19, status: "✅" }, { number: 20, status: "✅" }],
            21: [{ number: 17, status: "✅" }, { number: 18, status: "✅" }, { number: 19, status: "✅" }, { number: 20, status: "✅" }],
            22: [{ number: 16, status: "✅" }, { number: 17, status: "✅" }, { number: 18, status: "✅" }, { number: 19, status: "✅" }],
            23: [{ number: 15, status: "✅" }, { number: 16, status: "✅" }, { number: 17, status: "✅" }, { number: 18, status: "✅" }],
            24: [{ number: 14, status: "✅" }, { number: 15, status: "✅" }, { number: 16, status: "✅" }, { number: 17, status: "✅" }],
        }
    },
    9: {
        name: "", rows: {
            14: [{ number: 16, status: "✅" }, { number: 17, status: "✅" }, { number: 18, status: "✅" }, { number: 19, status: "✅" }],
            15: [{ number: 16, status: "✅" }, { number: 17, status: "✅" }, { number: 18, status: "✅" }, { number: 19, status: "✅" }],
            16: [{ number: 16, status: "✅" }, { number: 17, status: "✅" }, { number: 18, status: "✅" }, { number: 19, status: "✅" }],
            17: [{ number: 16, status: "✅" }, { number: 17, status: "✅" }, { number: 18, status: "✅" }, { number: 19, status: "✅" }],
            18: [{ number: 16, status: "✅" }, { number: 17, status: "✅" }, { number: 18, status: "✅" }, { number: 19, status: "✅" }],
            19: [{ number: 21, status: "✅" }, { number: 22, status: "✅" }, { number: 23, status: "✅" }, { number: 24, status: "✅" }],
            20: [{ number: 21, status: "✅" }, { number: 22, status: "✅" }, { number: 23, status: "✅" }, { number: 24, status: "✅" }],
            21: [{ number: 21, status: "✅" }, { number: 22, status: "✅" }, { number: 23, status: "✅" }, { number: 24, status: "✅" }],
            22: [{ number: 20, status: "✅" }, { number: 21, status: "✅" }, { number: 22, status: "✅" }, { number: 23, status: "✅" }],
            23: [{ number: 19, status: "✅" }, { number: 20, status: "✅" }, { number: 21, status: "✅" }, { number: 22, status: "✅" }],
            24: [{ number: 18, status: "✅" }, { number: 19, status: "✅" }, { number: 20, status: "✅" }, { number: 21, status: "✅" }],
        }
    },
    10: {
        name: "", rows: {
            12: [{ number: 32, status: "✅" }, { number: 33, status: "✅" }, { number: 34, status: "✅" }, { number: 35, status: "✅" }],
            13: [{ number: 32, status: "✅" }, { number: 33, status: "✅" }, { number: 34, status: "✅" }, { number: 35, status: "✅" }],
            14: [{ number: 32, status: "✅" }, { number: 33, status: "✅" }, { number: 34, status: "✅" }, { number: 35, status: "✅" }],
            15: [{ number: 32, status: "✅" }, { number: 33, status: "✅" }, { number: 34, status: "✅" }, { number: 35, status: "✅" }],
            16: [{ number: 32, status: "✅" }, { number: 33, status: "✅" }, { number: 34, status: "✅" }, { number: 35, status: "✅" }],
            17: [{ number: 32, status: "✅" }, { number: 33, status: "✅" }, { number: 34, status: "✅" }, { number: 35, status: "✅" }],
            18: [{ number: 32, status: "✅" }, { number: 33, status: "✅" }, { number: 34, status: "✅" }, { number: 35, status: "✅" }],
            19: [{ number: 37, status: "✅" }, { number: 38, status: "✅" }, { number: 39, status: "✅" }, { number: 40, status: "✅" }],
            20: [{ number: 37, status: "✅" }, { number: 38, status: "✅" }, { number: 39, status: "✅" }, { number: 40, status: "✅" }],
            21: [{ number: 37, status: "✅" }, { number: 38, status: "✅" }, { number: 39, status: "✅" }, { number: 40, status: "✅" }],
            22: [{ number: 36, status: "✅" }, { number: 37, status: "✅" }, { number: 38, status: "✅" }, { number: 39, status: "✅" }],
            23: [{ number: 35, status: "✅" }, { number: 36, status: "✅" }, { number: 37, status: "✅" }, { number: 38, status: "✅" }],
            24: [{ number: 34, status: "◼️" }, { number: 35, status: "✅" }, { number: 36, status: "✅" }, { number: 37, status: "✅" }],
        }
    },
    11: {
        name: "", rows: {
            12: [{ number: 9, status: "✅" }, { number: 10, status: "✅" }, { number: 11, status: "✅" }, { number: 19, status: "✅" }],
            13: [{ number: 9, status: "✅" }, { number: 10, status: "✅" }, { number: 11, status: "✅" }, { number: 19, status: "✅" }],
            14: [{ number: 16, status: "✅" }, { number: 17, status: "✅" }, { number: 18, status: "✅" }, { number: 19, status: "✅" }],
            15: [{ number: 16, status: "✅" }, { number: 17, status: "✅" }, { number: 18, status: "✅" }, { number: 19, status: "✅" }],
            16: [{ number: 16, status: "✅" }, { number: 17, status: "✅" }, { number: 18, status: "✅" }, { number: 19, status: "✅" }],
            17: [{ number: 16, status: "✅" }, { number: 17, status: "✅" }, { number: 18, status: "✅" }, { number: 19, status: "✅" }],
            18: [{ number: 16, status: "✅" }, { number: 17, status: "✅" }, { number: 18, status: "✅" }, { number: 19, status: "✅" }],
            19: [{ number: 21, status: "✅" }, { number: 22, status: "✅" }, { number: 23, status: "✅" }, { number: 24, status: "✅" }],
            20: [{ number: 21, status: "✅" }, { number: 22, status: "✅" }, { number: 23, status: "✅" }, { number: 24, status: "✅" }],
            21: [{ number: 21, status: "✅" }, { number: 22, status: "✅" }, { number: 23, status: "✅" }, { number: 24, status: "✅" }],
            22: [{ number: 20, status: "✅" }, { number: 21, status: "✅" }, { number: 22, status: "✅" }, { number: 23, status: "✅" }],
            23: [{ number: 19, status: "✅" }, { number: 20, status: "✅" }, { number: 21, status: "✅" }, { number: 22, status: "✅" }],
            24: [{ number: 18, status: "✅" }, { number: 19, status: "✅" }, { number: 20, status: "✅" }, { number: 21, status: "✅" }],
            25: [{ number: 16, status: "✅" }, { number: 17, status: "✅" }, { number: 18, status: "✅" }, { number: 19, status: "✅" }],
            26: [{ number: 16, status: "✅" }, { number: 17, status: "✅" }, { number: 18, status: "✅" }, { number: 19, status: "◼️" }],
        }
    },
    12: {
        name: "", rows: {
            19: [{ number: 45, status: "✅" }, { number: 46, status: "✅" }, { number: 47, status: "✅" }, { number: 48, status: "✅" }, { number: 49, status: "✅" }],
            20: [{ number: 45, status: "✅" }, { number: 46, status: "✅" }, { number: 47, status: "✅" }, { number: 48, status: "✅" }, { number: 49, status: "✅" }],
            21: [{ number: 45, status: "✅" }, { number: 46, status: "✅" }, { number: 47, status: "✅" }, { number: 48, status: "✅" }, { number: 49, status: "✅" }],
            22: [{ number: 44, status: "✅" }, { number: 45, status: "✅" }, { number: 46, status: "✅" }, { number: 47, status: "✅" }, { number: 48, status: "◼️" }],
            23: [{ number: 43, status: "✅" }, { number: 44, status: "✅" }, { number: 45, status: "✅" }, { number: 46, status: "◼️" }, { number: 47, status: "◼️" }],
            24: [{ number: 47, status: "✅" }, { number: 43, status: "✅" }, { number: 44, status: "◼️" }, { number: 45, status: "◼️" }, { number: 46, status: "◼️" }],
        }
    },
};

// Варианты получения билетов
const pickupOptions = [
    '🔥02.10 14:00-16:00 - КСК УНИКС, 5 этаж',
    '🔥05.10 16:00-18:00 - ДУ, 17 дом',
    '🔥09.10 15:00-17:00 - КСК УНИКС, 5 этаж'
];

// Подсчёт свободных мест
function calculateSections() {
    const sections = {};
    for (let secId in hall) {
        let free = 0;
        for (let rowNum in hall[secId].rows) {
            free += hall[secId].rows[rowNum].filter(s => s.status === "✅").length;
        }
        sections[secId] = free;
    }
    return sections;
}

// Клавиатура действий пользователя после бронирования
function getActionKeyboard() {
    return {
        inline_keyboard: [
            [{ text: '🎟 Все мои билеты', callback_data: 'all_tickets' }],
            [{ text: '❌ Отменить бронь', callback_data: 'cancel_tickets' }],
            [{ text: '➕ Забронировать ещё', callback_data: 'book_more' }]
        ]
    };
}

// Клавиатура для отмены билетов
function getCancelKeyboard(user) {
    const cancelKeyboard = user.selectedSeats.map((seat, idx) => [{ text: seat, callback_data: `cancel_${idx}` }]);
    cancelKeyboard.push([{ text: '⬅️ Назад', callback_data: 'back_to_actions' }]);
    return { inline_keyboard: cancelKeyboard };
}

// Клавиатура выбора получения билетов
function getPickupKeyboard() {
    return {
        inline_keyboard: pickupOptions.map((option, index) => [{ text: option, callback_data: `pickup_${index}` }])
    };
}

// Клавиатура мест секции с учетом выбранных пользователем мест
function getSeatsKeyboard(sectionId, user) {
    const section = hall[sectionId];
    const keyboard = [];

    for (const rowNum in section.rows) {
        const rowButtons = [{ text: `р${rowNum}`, callback_data: "noop" }];
        section.rows[rowNum].forEach(seat => {
            let status = seat.status;
            // Если пользователь уже выбрал это место, показываем как забронированное
            if (user.selectedSeats.includes(`Ряд ${rowNum}, Место ${seat.number}`)) {
                status = '❌';
            }
            rowButtons.push({
                text: `${seat.number} ${status}`,
                callback_data: `${sectionId}-${rowNum}-${seat.number}`
            });
        });
        keyboard.push(rowButtons);
    }

    keyboard.push([{ text: "⬅️ Вернуться к выбору секции", callback_data: "back_to_sections" }]);
    keyboard.push([{ text: "✅ Завершить бронирование", callback_data: "finish_booking" }]);
    return { inline_keyboard: keyboard };
}

// Отправка схемы зала
async function sendHallScheme(chatId, user) {
    if (user.lastSchemeMsgId) {
        try { await bot.deleteMessage(chatId, user.lastSchemeMsgId); } catch { }
    }

    const sections = calculateSections();

    // Формируем кнопки с количеством мест
    const sectionButtons = Object.keys(hall).map(secId => ({
        text: `${secId} - ${sections[secId]} мест`,
        callback_data: secId
    }));

    // Разбиваем кнопки по 3 в ряд
    const keyboard = [];
    for (let i = 0; i < sectionButtons.length; i += 3) {
        keyboard.push(sectionButtons.slice(i, i + 3));
    }

    const sentMsg = await bot.sendPhoto(chatId, './src/zal_DP_IF.png', {
        caption: `Выбери секцию, в которой хочешь занять место.`,
        reply_markup: { inline_keyboard: keyboard }
    });

    user.lastSchemeMsgId = sentMsg.message_id;
}


// Приветствие и ввод ФИО
bot.on('message', async msg => {
    const chatId = msg.chat.id;
    const user = getUser(chatId);
    const text = msg.text;

    if (text === '/start') {
        await bot.sendSticker(chatId, 'https://cdn2.combot.org/siba_oscar/webp/0xf09f918b.webp');
        await bot.sendMessage(chatId, `Здесь ты можешь забронировать места или отменить бронь на концерт *"День Первокурсника"* Института Физики КФУ.\n\n📍Большой зал, КСК УНИКС\n🕓 17:00 10.10.2025`, { parse_mode: "Markdown" });
        await bot.sendMessage(chatId, 'Чтобы продолжить, введи, пожалуйста, свои *Фамилию Имя*', { parse_mode: "Markdown" });
        await bot.sendSticker(chatId, 'https://cdn2.combot.org/siba_oscar/webp/3xf09f98a0.webp');
    } else if (text.split(' ').length === 2) {
        user.name = text;
        await bot.sendSticker(chatId, 'https://cdn2.combot.org/siba_oscar/webp/66xf09fa5b0.webp');
        await sendHallScheme(chatId, user);
    } else if (text === '/getBookingList') {
        let bookingText = '';

        for (const option of pickupOptions) {
            bookingText += `\n🔥${option}\n\n`;

            // собираем всех пользователей с таким местом получения
            const bookedUsers = Object.values(users).filter(u => u.pickupOption === option && u.selectedSeats.length);

            if (!bookedUsers.length) {
                bookingText += `   (нет броней)\n\n`;
                continue;
            }

            for (const u of bookedUsers) {
                bookingText += `    ${u.name} {\n`;
                for (const seat of u.selectedSeats) {
                    const cleanSeat = seat.replace(/Секция \d+, /, '');
                    bookingText += `        ${cleanSeat}\n`;
                }
                bookingText += `    }\n\n`;
            }
        }

        await bot.sendMessage(chatId, bookingText.trim());
    } else if (text === '/clearAnySeats') {
        // собираем все занятые места
        const allSeats = [];
        for (const u of Object.values(users)) {
            for (const seat of u.selectedSeats) {
                allSeats.push({ seat, userId: u.id });
            }
        }

        if (!allSeats.length) {
            return await bot.sendMessage(chatId, 'Забронированных мест нет 😅');
        }

        const seatKeyboard = allSeats.map(s => [{ text: s.seat.replace(/Секция \d+, /, ''), callback_data: `clearSeat_${s.userId}_${s.seat}` }]);
        seatKeyboard.push([{ text: '⬅️ Назад', callback_data: 'back_to_menu' }]);

        await bot.sendMessage(chatId, 'Выбери место для освобождения:', {
            reply_markup: { inline_keyboard: seatKeyboard }
        });
    } else {
        let randStickerNumber = Math.floor(Math.random() * 10);

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
});




// Обработка callback
bot.on('callback_query', async query => {
    const chatId = query.message.chat.id;
    const messageId = query.message.message_id;
    const data = query.data;
    const user = getUser(chatId);

    await bot.answerCallbackQuery(query.id);

    // Выбор секции
    if (/^\d+$/.test(data)) {
        const sectionId = data;
        await bot.editMessageReplyMarkup({ inline_keyboard: [] }, { chat_id: chatId, message_id: messageId });
        await bot.sendMessage(chatId, `Ты выбрал(а) секцию ${sectionId}, номера рядов указаны слева\n\n❌ - занято\n✅ - свободно\n◼️ - недоступно\n\nВыбери места:`, { reply_markup: getSeatsKeyboard(sectionId, user) });
        return;
    }

    // Выбор места
    if (/^\d+-\d+-\d+$/.test(data)) {
        const [sectionId, rowNum, seatNum] = data.split('-').map(Number);
        const seat = hall[sectionId].rows[rowNum].find(s => s.number === seatNum);

        if (seat.status === '◼️') return await bot.sendMessage(chatId, 'Место недоступно 🚫');
        if (seat.status === '❌') return await bot.sendMessage(chatId, 'Место занято 😔');

        seat.status = '❌';
        user.selectedSeats.push(`Секция ${sectionId}, Ряд ${rowNum}, Место ${seatNum}`);

        await bot.editMessageReplyMarkup(getSeatsKeyboard(sectionId, user), { chat_id: chatId, message_id: messageId });
        await bot.sendMessage(chatId, `Ты забронировал(а) ряд ${rowNum}, место ${seatNum} ✅`);
        return;
    }

    // Завершение бронирования
    if (data === 'finish_booking') {
        await bot.editMessageReplyMarkup({ inline_keyboard: [] }, { chat_id: chatId, message_id: messageId });
        if (!user.selectedSeats.length) {
            await bot.sendMessage(chatId, 'Ты не выбрал(а) ни одного места. 😅');
            await bot.sendMessage(chatId, 'Что хочешь сделать дальше?', { reply_markup: getActionKeyboard() });
        } else {
            await bot.sendMessage(chatId, 'Выбери место получения билетов:', { reply_markup: getPickupKeyboard() });
        }
        return;
    }

    // Выбор места получения билетов
    if (/^pickup_\d+$/.test(data)) {
        const index = Number(data.split('_')[1]);
        user.pickupOption = pickupOptions[index];
        await bot.editMessageReplyMarkup({ inline_keyboard: [] }, { chat_id: chatId, message_id: messageId });
        await bot.sendSticker(chatId, 'https://cdn2.combot.org/siba_oscar/webp/62xf09fa4a9.webp');
        await bot.sendMessage(chatId, `Заберешь билеты здесь:\n${user.pickupOption}`);
        await bot.sendMessage(chatId, 'Что хочешь сделать дальше?', { reply_markup: getActionKeyboard() });
        return;
    }

    // Просмотр всех билетов
    if (data === 'all_tickets') {
        await bot.editMessageReplyMarkup({ inline_keyboard: [] }, { chat_id: chatId, message_id: messageId });
        if (!user.selectedSeats.length) {
            await bot.sendMessage(chatId, 'У тебя пока нет билетов. 😅');
        } else {
            const pickup = user.pickupOption ? `\n\nМесто получения: \n${user.pickupOption}` : '';
            await bot.sendSticker(chatId, 'https://cdn2.combot.org/siba_oscar/webp/25xf09f9898.webp');
            await bot.sendMessage(chatId, `Все твои билеты:\n\n${user.selectedSeats.join('\n')}${pickup}`);
        }
        await bot.sendMessage(chatId, 'Что хочешь сделать дальше?', { reply_markup: getActionKeyboard() });
        return;
    }

    // Отмена билетов
    if (data === 'cancel_tickets') {
        if (!user.selectedSeats.length) {
            await bot.sendMessage(chatId, 'Нет билетов для отмены 😅');
            await bot.sendMessage(chatId, 'Что хочешь сделать дальше?', { reply_markup: getActionKeyboard() });

            return;
        }

        // 1) Убираем клавиатуру у сообщения "Что хочешь сделать дальше?"
        await bot.editMessageReplyMarkup({ inline_keyboard: [] }, { chat_id: chatId, message_id: messageId });

        // 2) Отправляем стикер
        await bot.sendSticker(chatId, 'https://cdn2.combot.org/siba_oscar/webp/31xf09f98a2.webp');

        // 3) Отправляем сообщение с клавиатурой для отмены билетов
        await bot.sendMessage(chatId, 'Выбери места, которые хочешь освободить:', {
            reply_markup: getCancelKeyboard(user)
        });

        return;
    }


    // Удаление конкретного билета
    if (/^cancel_\d+$/.test(data)) {
        const index = Number(data.split('_')[1]);
        const seatText = user.selectedSeats[index];
        const match = seatText.match(/Секция (\d+), Ряд (\d+), Место (\d+)/);
        if (match) {
            const [_, sectionId, rowNum, seatNum] = match.map(Number);
            const seat = hall[sectionId].rows[rowNum].find(s => s.number === seatNum);
            seat.status = '✅';
        }
        user.selectedSeats.splice(index, 1);

        if (user.selectedSeats.length) {
            await bot.editMessageReplyMarkup(getCancelKeyboard(user), { chat_id: chatId, message_id: messageId });
        } else {
            await bot.editMessageReplyMarkup({ inline_keyboard: [] }, { chat_id: chatId, message_id: messageId });
            await bot.sendSticker(chatId, 'https://cdn2.combot.org/siba_oscar/webp/75xf09f988e.webp');
            await bot.sendMessage(chatId, 'Все билеты удалены.');
            await bot.sendMessage(chatId, 'Что хочешь сделать дальше?', { reply_markup: getActionKeyboard() });
        }
        return;
    }

    // Возврат после отмены
    if (data === 'back_to_actions') {
        await bot.editMessageReplyMarkup({ inline_keyboard: [] }, { chat_id: chatId, message_id: messageId });
        await bot.sendMessage(chatId, 'Что хочешь сделать дальше?', { reply_markup: getActionKeyboard() });
    }

    // Забронировать ещё
    if (data === 'book_more') {
        await bot.sendSticker(chatId, 'https://cdn2.combot.org/siba_oscar/webp/40xf09f988d.webp');
        await bot.editMessageReplyMarkup({ inline_keyboard: [] }, { chat_id: chatId, message_id: messageId });
        await sendHallScheme(chatId, user);
    }

    // noop кнопка для ряда
    if (data === 'noop') return;

    // Возврат к выбору секции
    if (data === 'back_to_sections') {
        await bot.editMessageReplyMarkup({ inline_keyboard: [] }, { chat_id: chatId, message_id: messageId });
        await sendHallScheme(chatId, user); // Показываем снова схему зала с секциями
        return;
    }

    // Освобождение мест через /clearAnySeats
    if (data.startsWith('clearSeat_')) {
        const [, userId, seat] = data.split('_');
        const u = users[userId];
        if (u) {
            u.selectedSeats = u.selectedSeats.filter(s => s !== seat);
        }

        // обновляем список
        const allSeats = [];
        for (const usr of Object.values(users)) {
            for (const s of usr.selectedSeats) {
                allSeats.push({ seat: s, userId: usr.id });
            }
        }

        if (!allSeats.length) {
            return await bot.editMessageText('Все места освобождены ✅', { chat_id: chatId, message_id: messageId });
        }

        const seatKeyboard = allSeats.map(s => [{ text: s.seat.replace(/Секция \d+, /, ''), callback_data: `clearSeat_${s.userId}_${s.seat}` }]);
        seatKeyboard.push([{ text: '⬅️ Назад', callback_data: 'back_to_menu' }]);

        await bot.editMessageReplyMarkup({ inline_keyboard: seatKeyboard }, { chat_id: chatId, message_id: messageId });
        return;
    }

    if (data === 'back_to_menu') {
        await bot.editMessageText('Что хочешь сделать дальше?', {
            chat_id: chatId,
            message_id: messageId,
            reply_markup: getActionKeyboard()
        });
        return;
    }


});

