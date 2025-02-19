const express = require("express");
const { createMessage, getMessages } = require("../Controller/MessageController.js");

const router = express.Router();

router.post("/messages", createMessage);
router.get("/messages", getMessages);

module.exports = router;
