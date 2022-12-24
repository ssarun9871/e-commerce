//front-page
const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');

//route for front page(localhost:3000/)
router.get('/', productsController.getProducts);

module.exports = router;


