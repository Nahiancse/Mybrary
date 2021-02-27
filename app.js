if(process.env.NODE_ENV !== 'production'){
    require('dotenv').config()

}

const express=require('express');
const expressLayouts=require('express-ejs-layouts');
const app=express();
const indexRoute=require('./routes/index');
const mongoose=require('mongoose');


app.set('view engine','ejs');
app.set('views',__dirname+'/views');
app.set('layout','layouts/layout');
app.use(expressLayouts);
app.use(express.static('public'));


app.use(indexRoute)

mongoose.connect(process.env.DATABASE_URL,{useNewUrlParser:true,  useUnifiedTopology: true});
const db=mongoose.connection;
db.on('error',error=>console.error(error));
db.once('open',()=>console.log('connected to mongoose'));



app.listen(process.env.Port || 3000);