const Product = require('../models/product');
const Cart = require('../models/cart');
const cartItem = require('../models/cart-item')
const sequelize = require('../util/database');
const { Sequelize } = require('sequelize');

exports.getProducts = (req, res, next) => {
  Product.findAll()
    .then(products => {
      res.render('shop/product-list', {
        prods: products,
        pageTitle: 'All Products',
        path: '/products'
      });
    })
    .catch(err => {
      console.log(err);
    });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;

  Product.findByPk(prodId)
    .then(product => {
      res.render('shop/product-detail', {
        product: product,
        pageTitle: product.title,
        path: '/products'
      });
    })
    .catch(err => console.log(err));
};

exports.getIndex = (req, res, next) => {

  Product.findAll()
  .then(products=>{
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/'
    })
  })
  .catch(err=>{
    console.log(err);
  });
 
};


exports.getCart = (req, res, next) => {
  req.user
    .getCart()
    .then(cart => {
      return cart
        .getProducts()
        .then(products => {
          res.render('shop/cart', {
            path: '/cart',
            pageTitle: 'Your Cart',
            products: products
          });
        })
        .catch(err => console.log(err));
    })
    .catch(err => console.log(err));
};

exports.postCart = async (req, res, next) => {
  const id = req.params.productId;
  await cartItem.create({
    prodId:id
  })
  Product.findByPk(id)
  .then(item=>res.status(200).json({success:true , item:item.dataValues,msg:"added successfully to the cart!!"}))
  .catch(err=>res.status(500).json({error:err, msg:"unable to add into cart!!"}));  
};



exports.postCartAll = async(req,res,next)=>{
  await cartItem.findAll()
  .then(data=>{
    let prodIds = [];//fetching product ids from the cart table and storing it in this array
    for(let i=0; i<data.length; i++){
      prodIds.push(data[i].dataValues.prodId);
    }
    return prodIds;})
  .then(async prodIds=>{
    let prodInfo =[];//using the product ids from the cart we retrieve product info from product table and store it in this array
  
    for(let i=0; i<prodIds.length; i++){
      let data = await Product.findByPk(prodIds[i])
      prodInfo.push(data.dataValues);
    }
    res.send(prodInfo)
  })
} 
 
  
  
exports.postCartDeleteProduct = (req, res, next) => {
  const prodId = req.body.productId;
  req.user
    .getCart()
    .then(cart => {
      return cart.getProducts({ where: { id: prodId } });
    })
    .then(products => {
      const product = products[0];
      return product.cartItem.destroy();
    })
    .then(result => {
      res.redirect('/cart');
    })
    .catch(err => console.log(err));
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders'
  });
};



exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout'
  });
};
