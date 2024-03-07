const express = require('express');
const cookieParser = require('cookie-parser')
require('dotenv').config();
require("./config/db").dbConnect();
const indexRoute = require('./routes/index');

const app = express()


app.use(express.json());
app.use(cookieParser())


app.get("/", (_req, res) => {
  res.redirect("/api/v1");
});

//= = Root Route ==============
app.use("/api/v1", indexRoute);


module.exports = app
