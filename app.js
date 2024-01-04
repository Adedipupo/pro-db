const express = require('express');
require('dotenv').config();
require("./config/db").dbConnect();

const app = express()


app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello World!')
})

module.exports = app
