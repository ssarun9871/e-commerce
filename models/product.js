const fs = require('fs');
const rootDir = require('../util/path');
const path = require('path')
const dataFilePath = path.join(rootDir,'data','products.json');

const getProductsFromFile = cb=>{
    fs.readFile(dataFilePath,'utf-8',(err,data)=>{
    if(err){
        cb([]);
    }
    else {cb(JSON.parse(data));}
    });
}


module.exports = class Product {
    constructor(t) {
        this.title = t;
    }

    save() {
        getProductsFromFile(products => {
        products.push(this);
         fs.writeFile(dataFilePath, JSON.stringify(products), err => {
         console.log(err);
         });
        });
    }
    
    static fetchAll(cb) {
       getProductsFromFile(cb);
    }
};
