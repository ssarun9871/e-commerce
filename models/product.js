const fs = require('fs');
const rootDir = require('../util/path');
const path = require('path')
const dataFilePath = path.join(rootDir,'data','products.json');
const db = require('../util/database');

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
   return db.execute('insert into products(title,price,imageUrl,description) values(?,?,?,?)',
    [this.title,this.price,this.imageUrl,this.description]
     );
    }

    
  static deleteById(id) {
  
  }

    
    static fetchAll() {
     return db.execute('select * from  products')
     
    }

    static findById(id){
    return db.execute('select * from products where products.id=?',[id]);
    }
    
};

