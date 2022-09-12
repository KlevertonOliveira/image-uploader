/* Configs */
require('dotenv').config();
require('express-async-errors');

/* Express */
const express = require('express');
const app = express();

/* Imports */
const mongoose = require('mongoose');

/* Middleware */

// errors

/* Routes */
app.get('/', (req, res)=>{
  res.send('Hello, World!');
})

/* Start setup */

const port = process.env.PORT || 5000;

const start = async() => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    app.listen(port, ()=>{
      console.log(`Server is listening on port ${port}`);
    })
  } catch (error) {
    console.log(error);
  }
}

start();