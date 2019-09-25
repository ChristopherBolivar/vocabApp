document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

var newWord = document.querySelector('#newWord')
var wordForm = document.querySelector('#createDeckForm')
var wordList = document.querySelector('#wordList')
var submit = document.querySelector('#submitWords')
var deckName = document.querySelector('#quizName')
var wordArr = []
var wordCount = 0
// var addNewWord = document.createElement(`<input id="input${wordCount}" type="text">`)
var addNewWord = document.createElement(`INPUT`)

newWord.addEventListener('click', () => {

let somthing = document.createElement('div')

  somthing.innerHTML= `<input type="text" id="input${wordCount}" >`
  wordList.appendChild(somthing)
  wordCount++
})

submit.addEventListener('click', (e) =>{
  e.preventDefault();
  for(let i = 0; i < wordForm.length - 1; i++){
    console.log(i)
    wordArr.push(document.querySelector(`#input${i}`).value)
  }
  console.log(">>>>>>>>>>>>>>>> ", wordArr)
  console.log("this is the quiz name ))))))))))))))) ", document.querySelector('#quizname').value);
  
  setTimeout(() => {
    axios.post(`http://localhost:3000/submit`, {words: wordArr, quizname: document.querySelector('#quizname').value})
    .then(a =>{
      console.log('Succes')
  }, 1000)
  }).catch(err => console.log(err));
  
})