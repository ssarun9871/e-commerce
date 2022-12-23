//front-page
const express = require('express');
const router = express.Router();

//route for front page(localhost:3000/)
router.get('/',(req,res,next)=>{
    res.send('<h1>This is home</h1>');
}) 

module.exports = router;