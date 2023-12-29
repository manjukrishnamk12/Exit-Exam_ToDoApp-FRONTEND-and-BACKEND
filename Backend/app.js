const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

require("./db/connect");

const todorouter = require('./routes/ToDo_crud');
app.use('/Todo', todorouter);



const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
})