const { StatusCodes } = require('http-status-codes');
const Product = require('../models/Product');

const createProduct = async(req, res) => {
  return res
  .status(StatusCodes.CREATED)
  .json({
    message: "Create product route"
  })
}

const getAllProducts = async(req, res) => {
  return res
  .status(StatusCodes.OK)
  .json({
    message: "Get all products route"
  })
}

module.exports = {
  createProduct,
  getAllProducts
}