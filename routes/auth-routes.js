// routes/auth-routes.js
const express = require("express");
const router = express.Router();
const flash = require("connect-flash")
const bcrypt  = require('bcrypt');
const User = require("../models/userModel");
const Card = require("../models/flashcardModel");



router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});

router.post('/signup', (req, res, next)=>{

  const username = req.body.username;
  const password = req.body.password;
  const salt  = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);



  User.create({
      username: username,
      password: hash
  })
  .then((a)=>{
      res.redirect('/login')

  })
  .catch((err)=>{
      next(err)
  })
})




router.get("/login", (req, res, next) => {
  res.render("auth/login");
});


router.post('/login', (req, res, next)=>{
  const username = req.body.username;
  const password = req.body.password;

  // we are trying to find a user who's username is equal to the usernam variable we just created
User.findOne({ username: username })
.then(userfromDB => {
    if (!userfromDB) {

          req.flash('error', 'sorry that username doesnt exist');
          // this is the same as doing the line below, just that flash does not allow us to interact with the object directly so it has special getters & setters
          // req.flash.error = 'sorry that username doesnt exist'

      res.redirect('/login');
    }
    if (bcrypt.compareSync(password, userfromDB.password)) {
      // Save the login in the session!
      req.session.currentuser = userfromDB;
      // this is the magic ^ line of code that actually logse you in
      res.redirect(`/profile/${userfromDB._id}`);
    } else {
        res.redirect('/')
    }
})
.catch(error => {
  next(error);
})




})





router.get("/logout", (req, res, next) => {
  req.session.destroy((err) => {
    // can't access session here
    res.redirect("/login");
  });
});

router.get('/profile/:id', (req, res, next)=>{

    Card.find({ creator: `${req.params.id}`}).then((decks)=>{
      console.log(decks[0].name, "<=========")

      res.render('user/profile', {theUser: req.session.currentuser, showDecks: decks})
    })
  })
 



module.exports = router;