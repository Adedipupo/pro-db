const { registerUser,loginUser } = require('../controller/user');

const express = require('express');

const router = express.Router();





router.post("/signup", registerUser);
router.post("/login", loginUser);

module.exports =  router;