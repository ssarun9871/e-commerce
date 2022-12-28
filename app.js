const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const rootDir = require('./util/path');

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop');
const contactus = require('./routes/contactus');

app.use(bodyParser.urlencoded({ extended: false }));

//this is important to serve css statically
app.use(express.static(path.join(__dirname, 'public')))

app.use((req,res,next)=>{
    User.findByPk(1)
    .then(user=>{
        req.user = user;
        next();
    })
    .catch(err=>console.log(err));
})

const sequelize = require('./util/database');
const Product = require('./models/product');
const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(contactus);

app.use((req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'page not found!!',
        path: ''
    })
})

Product.belongsTo(User,{constraints:true , onDelete: 'CASCADE'});
User.hasMany(Product);

sequelize
.sync()
.then(result => {
    return User.findByPk(1);
})
.then(user=>{
    if(!user){
       return User.create({name:'Max', email:'test@test.com'});
    }
    return user;
})
.then(user=>{
   // console.log(user);
    app.listen(3000);
})
.catch(err => {
    console.log(err);
})



