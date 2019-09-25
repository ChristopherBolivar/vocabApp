const express = require('express');
const router  = express.Router();
const Card = require("../models/flashcardModel");


router.get('/submit', (req, res, next) => {
  res.render('/profile');
});

router.post('/submit', (req, res, next)=>{
  
  const quizname = req.body.quizname;
  const words = req.body.words;

  
  // console.log("===>+>+>++>+>+>+> ", req.session.currentuser)

  Card.create({
      name: quizname,
      word: words,
      creator: req.session.currentuser
  })
  .then(()=>{

      res.redirect('/')

  })
  .catch((err)=>{
      next(err)
  })
})

module.exports = router;
