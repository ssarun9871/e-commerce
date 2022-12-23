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

app.use('/admin',adminRoutes);
app.use('/admin',shopRoutes);
app.use(contactus);

app.use((req,res,next)=>{
    res.status(404).sendFile(path.join(rootDir,'views','404.html'))
})

app.listen(3000); 