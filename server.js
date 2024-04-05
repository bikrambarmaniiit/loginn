const express =require("express");
const bodyparser = require("body-parser");
const session =require("express-session");
const path = require('path');
const app=express();
const {v4:uuid}=require("uuid");

const router = require('./router');

const port=process.env.PORT || 3000;

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:true}));

app.set('view engine', 'ejs');

//load static assets
app.use('/static',express.static(path.join(__dirname, 'public')));
app.use('/static',express.static(path.join(__dirname, 'public/assets')));

app.use(session({
    secret: uuid(),
    resave: false,
    saveUninitialized:true
}));

app.use('/route', router);

//home route
app.get('/',(req,res) => {
    res.render('base', {tile: "Login System"});
})

app.listen(port, () => {console.log("Listening to the server on localhost 300")});