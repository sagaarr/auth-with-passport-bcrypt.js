const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport')
const bcrypt = require('bcryptjs');
const session = require('express-session');
let auth = require('./_routes/_user-route');

require('./_configuration/passport')(passport);


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
  }))

  app.use(passport.initialize());
  app.use(passport.session());


// =========Mongoose Connected========
mongoose.connect('mongodb://localhost:27017/myapp', {useNewUrlParser: true})
        .then(()=>{console.log("connected")})
        .catch((err)=> console.log(err));

//  User model imported and connected ====
require("./models/_user");
let User = mongoose.model('User');


app.get("/", (req,res) =>{
    res.send('<h1>Login Success</h1>')
})

app.use("/auth", auth);


app.listen(3000, ()=> console.log("LocalHost 3000"));