// src/users.js
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

module.exports = {
    users,
    getUser
};
