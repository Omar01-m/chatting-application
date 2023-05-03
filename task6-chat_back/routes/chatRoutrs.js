const express = require("express");
const { accessChat, fetchChats } = require("../controlers/chatControllers");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// route1: "/" is for accessing the chat or creating it


// fetching all the chats from our database

router.post('/', protect, accessChat);
router.get('/', protect, fetchChats);

module.exports = router;
