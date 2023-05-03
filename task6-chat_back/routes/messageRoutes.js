const express = require('express');
const { sendMessages, allMessages } = require('../controlers/messageControllers');

const router = express.Router();


router.route('/').post(protect,sendMessages)
//gonna fetch all of the messages for one single chat
router.route('/:chatId').get(protect,allMessages)



module.exports = router;
