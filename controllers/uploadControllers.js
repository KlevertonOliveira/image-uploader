const fs = require('fs');
const cloudinary = require('cloudinary').v2;
const { StatusCodes } = require('http-status-codes')
const BadRequestError = require('../errors/bad-request');

const uploadProductImage = async(req, res) => {
  const { file } = req.files;

  if(!file.mimetype.startsWith("image")){
    throw new BadRequestError("Invalid file type. Please, provide an image.");
  }

  const result = await cloudinary.uploader.upload(
    file.tempFilePath, 
    { use_filename: true, folder: 'image-uploader' },
  )

  fs.unlinkSync(file.tempFilePath);

  return res.status(StatusCodes.OK).json({
    image: { src: result.secure_url }
  })
}

module.exports = {
  uploadProductImage
}