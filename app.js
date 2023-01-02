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
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const cors = require('cors');

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(cors());
app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(contactus);

app.use((req, res, next) => {
    res.status(404).render('404', {
        pageTitle: 'page not found!!',
        path: ''
    })
})

Product.belongsTo(User, { constraints: true, onDelete: 'CASCADE' });
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, { through: CartItem });
Product.belongsToMany(Cart, { through: CartItem });


sequelize
  // .sync({ force: true })
  .sync()
  .then(result => {
    return User.findByPk(1);
  })
  .then(user => {
    if (!user) {
      return User.create({ name: 'Max', email: 'test@test.com' });
    }
    return user;
  })
  .then(user => {
    return user.createCart();
  })
  .then(cart => {
    app.listen(3000);
  })
  .catch(err => {
    console.log(err);
  });