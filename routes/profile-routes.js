const express = require('express');
const router  = express.Router();
const User = require("../models/userModel");
const Card = require("../models/flashcardModel");
const axios = require('axios');

router.get('/deck/:id', (req, res, next) => {
  Card.findById(req.params.id).then((deckData)=>{
  deckData.word.forEach(element => {
    console.log("============?=====>>>>>>",element)

  axios.get('https://www.dictionaryapi.com/api/v3/references/collegiate/json/' + element + '?key=ee67d907-7224-4430-a548-5dffdc6214eb').then((data)=>{

console.log(data.data[0].shortdef)
    
  res.render('user/deck', {data: deckData, def: data.data[0].shortdef});

  }).catch(err => next(err));

  });

  }).catch(err => next(err));
});

module.exports = router;
