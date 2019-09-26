const express = require('express');
const router = express.Router();
const User = require("../models/userModel");
const Card = require("../models/flashcardModel");
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
    console.log(card.name,"=-=-=-=-=-=-=-=-=-")
    res.render('user/edit', {card:card});
  })
});



module.exports = router;