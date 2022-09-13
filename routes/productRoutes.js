const express = require('express');
const router = express.Router();

const { getAllProducts, createProduct } = require('../controllers/productControllers');
const { uploadProductImage } = require('../controllers/uploadControllers');

router.route('/').get(getAllProducts).post(createProduct);
router.route('/uploads').post(uploadProductImage);

module.exports = router;