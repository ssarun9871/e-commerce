const express = require('express');
const router = express.Router();
const productsController = require('../controllers/products');


//add-product route (localhost:3000/admin/add-product)
//admin in url, is bcz of filtering in app.js
router.get('/add-product',productsController.getAddProduct);

//product route (localhost:3000/admin/product),  but it handle post request so it can't be accessible through URL
router.post('/product',productsController.postAddProduct);

module.exports=router;