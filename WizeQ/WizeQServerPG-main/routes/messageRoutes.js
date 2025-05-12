const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

router.get('/:chat_id', messageController.getMessageById);
router.delete('/:chat_id', messageController.deleteMessage);
router.post('/', messageController.createMessage);

module.exports = router;