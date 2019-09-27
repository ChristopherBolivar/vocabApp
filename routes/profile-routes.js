const express = require('express');
const router = express.Router();
const User = require("../models/userModel");
const Card = require("../models/flashcardModel");
const bcrypt  = require('bcrypt');
const axios = require('axios');

router.get('/deck/:id', (req, res, next) => {

  Card.findById(req.params.id).then((deckData) => {



      let newStuff = deckData.word.map((element) => {
        return axios.get('https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + element + '?key=ee67d907-7224-4430-a548-5dffdc6214eb')
          .then((theDef) => {
            return ((theDef.data[0].shortdef))

          })
          .catch((err) => {
            console.log(err)
          })
      })



      Promise.all(newStuff)
        .then((arrayOfDefs) => {
          let wordDefs = []
         arrayOfDefs.forEach((element,i)=>{
          //  element = element.join(";")
          wordDefs.push(
            {
            word: deckData.word[i],
            def: element
            }
          )
         })

         console.log(wordDefs, "<=========")





          res.render('user/deck', {
            cardData: deckData,
            data: wordDefs
          });
        })
        .catch((err) => {
          next(err)
        })


    })
    .catch(err => next(err));
});




router.get('/create-new-deck', (req, res, next) => {
 
  res.render('user/create-new');
});


router.get('/edit-deck/:id', (req, res, next) => {
  console.log(req.params.id)
  Card.findById(req.params.id).then(card =>{
    res.render('user/edit', {card:card});
  })
});

router.get('/edit-profile/:id', (req, res, next)=>{

  User.findById(req.params.id).then((user)=>{
    res.render('user/edit-profile', {theUser: req.session.currentuser})
  })
  
})
router.post('/edit-profile/:id', (req,res,next)=>{
  const newUsername = req.body.username;
  const newPassword = req.body.password;
  const salt  = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(newPassword, salt);
  User.findByIdAndUpdate(req.params.id, {

    username: newUsername,
    password: hash

})
.then((result)=>{
    res.redirect('/logout')
})
.catch((err)=>{
    next(err);
})
})


router.get('/profile', (req, res, next)=>{
  Card.find({ creator: `${req.session.currentuser._id}`}).then((decks)=>{

    res.render('user/profile', {theUser: req.session.currentuser, showDecks: decks})
  })
})



router.get('/delete-card/:id',(req,res,next)=>{
  Card.findByIdAndRemove(req.params.id)
  .then((result)=>{
      res.redirect('/profile')
  })
  .catch((err)=>{
      next(err)
  })
})


module.exports = router;