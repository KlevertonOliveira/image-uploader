/* Configs */
require('dotenv').config();
require('express-async-errors');

/* Express */
const express = require('express');
const app = express();

/* Imports */
const mongoose = require('mongoose');

const notFound = require('./middleware/not-found');
const errorHandler = require('./middleware/error-handler');

const productRouter = require('./routes/productRoutes');

/* Middleware */
app.use(express.static('./public'));
app.use(express.json());


/* Routes */
app.use('/api/v1/products', productRouter);

// errors
app.use(notFound);
app.use(errorHandler);

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