const { db } = require('../config/db');

const getMessageById = async (chat_id) => {
    try {
        const query = 'SELECT d.id, d.is_from, d.message FROM messages d WHERE d.chat_id = $1 ORDER BY id ASC;';
        const { rows } = await db.query(query, [chat_id]);
        return rows;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const deleteMessage = async (chat_id) => {
    try {
        const query = 'DELETE FROM messages WHERE chat_id = $1 RETURNING *';
        const { rows } = await db.query(query, [chat_id]);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

const createMessage = async (_message) => {
    try {
        const query = 'INSERT INTO messages (chat_id, is_from, message) VALUES ($1, $2, $3) RETURNING *';
        const { chat_id, is_from, message } = _message;
        const { rows } = await db.query(query, [chat_id, is_from, message]);
        return rows[0];
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

module.exports = { getMessageById, deleteMessage, createMessage }