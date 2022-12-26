const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const path = require('path');
const rootDir = require('./util/path');

const adminRoutes = require('./routes/admin')
const shopRoutes = require('./routes/shop');
const contactus = require('./routes/contactus');

app.use(bodyParser.urlencoded({extended:false}));

//this is important to serve css statically
app.use(express.static(path.join(__dirname,'public')))

const sequelize = require('./util/database');

app.set('view engine','ejs');
app.set('views','views');

// db.execute('select * from products')
// .then(result=>{
//    // console.log(result)
// })
// .catch(err=>{
//     console.log(err);
// });

app.use('/admin',adminRoutes);
app.use(shopRoutes);
app.use(contactus);

app.use((req,res,next)=>{
    res.status(404).render('404',{
        pageTitle:'page not found!!',
        path: ''
    })
})

    sequelize.sync().then(result=>{
       // console.log(result);
        app.listen(3000); 
    })
    .catch(err=>{
        console.log(err);
    })



