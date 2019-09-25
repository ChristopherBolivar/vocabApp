const express = require('express');
const router  = express.Router();
const Card = require("../models/flashcardModel");


router.get('/submit', (req, res, next) => {
  res.render('/profile');
});

router.post('/submit', (req, res, next)=>{
console.log("this is the req. body >>><<<<<<>>>>><<<<>> ", req.body)
  
  const quizname = req.body.quizname;
  const words = req.body.words;
  
  console.log("=============== ", words)

  Card.create({
      name: quizname,
      word: words,
      creator: req.session.currentuser._id,
  })
  .then(()=>{

      res.redirect('/')

  })
  .catch((err)=>{
      next(err)
  })
})

module.exports = router;
