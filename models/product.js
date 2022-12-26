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
    constructor(id, title, imageUrl, description, price) {
        this.id = id;
        this.title = title;
        this.imageUrl = imageUrl;
        this.description = description;
        this.price = price;
    }

    save() {
        getProductsFromFile(products => {
            if (this.id) {
              const existingProductIndex = products.findIndex(
                prod => prod.id === this.id
              );
              const updatedProducts = [...products];
              updatedProducts[existingProductIndex] = this;
              fs.writeFile(dataFilePath, JSON.stringify(updatedProducts), err => {
                console.log(err);
              });
            } else {
              this.id = Math.random().toString();
              products.push(this);
              fs.writeFile(dataFilePath, JSON.stringify(products), err => {
                console.log(err);
              });
            }
          });
        }

    
  static deleteById(id) {
    getProductsFromFile(products => {
      const product = products.find(prod => prod.id === id);
      const updatedProducts = products.filter(prod => prod.id !== id);
      fs.writeFile(dataFilePath, JSON.stringify(updatedProducts), err => {
        if (!err) {
          Cart.deleteProduct(id, product.price);
        }
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

