const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
    res.render('add-product', {
      pageTitle: 'Add Product',
      path: '/admin/add-product',
      formsCSS: true,
      productCSS: true,
      activeAddProduct: true
    });
  }

  //this controller will create a new object and store it in an array present in models>product.js
  exports.postAddProduct = (req,res,next)=>{
    const product = new Product(req.body.title);//this title is fetched from the add-product.ejs form
    product.save();
    res.redirect('/');
}

 exports.getProducts=(req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
      hasProducts: products.length > 0,
      activeShop: true,
      productCSS: true
    });
  });
};
