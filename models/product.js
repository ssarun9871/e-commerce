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
    constructor(title,imageUrl,description,price) {
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        this.id = Math.random().toString;
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

    static findById(id,cb){
        getProductsFromFile(products=>{
        const product = products.find(p=>p.id===id);
        cb(product);
        });
    }
    
};

