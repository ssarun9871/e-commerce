const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const rootDir = require('./util/path');

const mongoConnect = require('./util/database').mongoConnect;
//const User = require('./models/user');

app.set('view engine', 'ejs');
app.set('views', 'views');

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop');
// const contactus = require('./routes/contactus');

app.use(bodyParser.urlencoded({ extended: false }));

//this is important to serve css statically
app.use(express.static(path.join(__dirname, 'public')));

const cors = require('cors');

app.use(cors());
app.use('/admin', adminRoutes);
app.use(shopRoutes); 
// app.use(contactus);

mongoConnect((client)=>{
  console.log(client);
app.listen(4000);
}); 

mongoose.connect('mongodb+srv://ssarun9871:9871Kumar@cluster0.oxomptf.mongodb.net/shop?retryWrites=true&w=majority')
.then(result =>{
  app.listen(3000);
  })
  .catch(err =>{
    console.log(err);
  })


// app.use((req, res, next) => {
//     res.status(404).render('404', {
//         pageTitle: 'page not found!!',
//         path: ''
//     })
// })
