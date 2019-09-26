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

router.get('/create-new-deck', (req, res, next) => {
  res.render('user/create-new');
});

router.get('/update', (req, res, next) => {
  res.render('/profile');
});

router.post('/update', (req, res, next)=>{
  
  const quizname = req.body.quizname;
  const words = req.body.words;
  const cardId = req.body.cardId

  
  // console.log("===>+>+>++>+>+>+> ", req.session.currentuser)

  Card.findByIdAndUpdate(cardId, {

    name: quizname,
    word: words

})
.then((result)=>{
    res.redirect('/deck/'+cardId)
})
.catch((err)=>{
    next(err);
})
})
module.exports = router;
