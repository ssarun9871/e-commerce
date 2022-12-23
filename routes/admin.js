const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');

//add-product route (localhost:3000/admin/add-product)
//admin in url, is bcz of filtering in app.js
router.get('/add-product',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','add-product.html'));
})


//product route (localhost:3000/admin/product),  but it handle post request so it can't be accessible through URL
router.post('/product',(req,res,next)=>{
    console.log(req.body);
    res.send(req.body);
})

module.exports=router;