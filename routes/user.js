const { registerUser,loginUser, dashboard } = require('../controller/user');

const express = require('express');
const { authToken } = require('../middleware/auth');

const router = express.Router();





router.post("/signup", registerUser);
router.post("/login", loginUser);
router.get("/dashboard",authToken, dashboard);

module.exports =  router;