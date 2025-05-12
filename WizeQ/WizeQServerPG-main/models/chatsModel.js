const { db } = require('../config/db');

const getChatsById = async (id) => {
    try {
        const query = 'SELECT d.id, d.title FROM users U JOIN chats d ON U.id = d.user_id WHERE U.id = $1 ORDER BY id DESC;';
        const { rows } = await db.query(query, [id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const createChat = async (chat) => {
    try {
        const query = 'INSERT INTO chats (title, user_id) VALUES ($1, $2) RETURNING *';
        const { rows } = await db.query(query, [chat.title, chat.user_id]);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const deleteChat = async (id) => {
    try {
        const query = 'DELETE FROM chats WHERE id = $1 RETURNING *';
        const { rows } = await db.query(query, [id]);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const updateChat = async (id, chat) => {
    try {
        const query = 'UPDATE chats SET title = $1 WHERE id = $2 RETURNING *';
        const { rows } = await db.query(query, [chat.title, id]);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

module.exports = { getChatsById, createChat, deleteChat, updateChat }