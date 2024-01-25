
const express = require('express');
const userRoute = require('./user');


const router = express.Router();



router.get("/", (_req, res) => {
    res.send("api server is live");
  });

router.use("/user", userRoute);

module.exports = router;