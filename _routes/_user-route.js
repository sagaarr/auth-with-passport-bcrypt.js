const express = require('express');
const mongoose = require('mongoose');
const passport = require("passport")
const bcrypt = require('bcryptjs');
const router = express.Router()

require('../models/_user')
let User = mongoose.model('User')

//======== Login Route ============ 
router.get('/login', (req,res) =>{
    res.send('LOGIN Route')
})

router.post('/login', (req,res)=>{
  passport.authenticate('local', { successRedirect: '/',
                                   failureRedirect: '/login'
                                 })(req,res,next);
})
// ===========Register Route ============
router.get('/register', (req,res) =>{
    res.send("Register Route")
})


// Register route for user verification ====
router.post("/register", (req, res) =>{

   User.findOne({email:req.body.email},function(err, found){
       if(err){
           console.log(err);
       }else{
           if(User.email !== req.body.email){
               let newUser = new User({
                   name:req.body.name,
                   email:req.body.email,
                   password:req.body.password
               })
               bcrypt.genSalt(10, function(err, salt) {
                bcrypt.hash(req.body.password, salt, function(err, hash) {
                    // Store hash in your password DB.
                    newUser.password = hash;
                    newUser.save().then((user)=>{
                        console.log(user)
                        res.redirect('/auth/login');
                    }).catch((err) => console.log(err))
                });
               
            });
           }
       }
   })

})


/*
 let newUser = new User({
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
    })
    newUser.save().then((user) =>{
        console.log(user);
    })


    // User.findOne({email:req.body.email}).then()
*/

module.exports = router;