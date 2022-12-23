const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({extended:false}));


app.use('/add-product',(req,res,next)=>{

    res.send(`<form action="/product" method="POST" onSubmit="false">
              <input type="text" name="title">
              <input type="text" name="size">
              <button type="submit">Add product</button>
              </form>`);
})

//It will show the req.body in browser and console both
app.use('/product',(req,res,next)=>{
    console.log(req.body);
    res.send(req.body);
})

app.use('/',(req,res,next)=>{
    res.send('<h1>This is home</h1>');
})

app.listen(3000);