const path = require('path');
const rootDir = require('../util/path');

exports.contactus=(req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','contactus.html'));
}

exports.success = (req,res,next)=>{
    res.sendFile(path.join(rootDir,'views','success.html'));
  
}