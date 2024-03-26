const express = require('express');
const cookieParser = require('cookie-parser')
const morgan = require('morgan')
const fileUpload = require('express-fileupload')
require('dotenv').config();
require("./config/db").dbConnect();
const indexRoute = require('./routes/index');


const app = express()


const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml')
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(express.json());
app.use(cookieParser())
app.use(express.urlencoded({ extended: true }));
app.use(morgan('tiny'))
app.use(fileUpload())


app.get("/", (_req, res) => {
  res.redirect("/api/v1");
});

//= = Root Route ==============
app.use("/api/v1", indexRoute);


module.exports = app
