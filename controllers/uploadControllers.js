const { StatusCodes } = require('http-status-codes')

const uploadProductImage = async(req, res) => {
  return res
  .status(StatusCodes.OK)
  .json({
    message: "Upload Product Image route"
  })
}

module.exports = {
  uploadProductImage
}