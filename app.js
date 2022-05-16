//Extentions
const express = require('express');

//Init express app
const app = express();

//Enable incoming Json data
app.use(express.json());

module.exports = { app };
