const express = require('express');
const router = express.Router();
const messageController = require('../controllers/messageController');

// Définir les routes de l'API
router.get('/messages', messageController.getMessages);
router.post('/messages', messageController.createMessage);
router.delete('/messages/:id', messageController.deleteMessage);

module.exports = router;
