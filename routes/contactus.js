const express = require('express');
const router = express.Router();
const path = require('path');
const rootDir = require('../util/path');

router.get('/contactus',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','contactus.html'));
})

router.post('/success',(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','success.html'));
})
module.exports=router;