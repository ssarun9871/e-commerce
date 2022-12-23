const express = require('express');
const router = express.Router();

//add-product route (localhost:3000/admin/add-product)
//admin in url, is bcz of filtering in app.js
router.get('/add-product',(req,res,next)=>{
    res.send(`<form action="/admin/product" method="POST" onSubmit="false">
              <input type="text" name="title">
              <input type="text" name="size">
              <button type="submit">Add product</button>
              </form>`);
})


//product route (localhost:3000/admin/product),  but it handle post request so it can't be accessible through URL
router.post('/product',(req,res,next)=>{
    console.log(req.body);
    res.send(req.body);
})

module.exports=router;