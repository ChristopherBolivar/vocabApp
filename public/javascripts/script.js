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

  somthing.innerHTML= `<input class="mt-3" placeholder="Type word #${wordCount + 1}" type="text" id="input${wordCount}" >`
  wordList.appendChild(somthing)
  wordCount++
})

submit.addEventListener('click', (e) =>{
  e.preventDefault();
  for(let i = 0; i < wordForm.length - 1; i++){
    console.log(i)
    wordArr.push(document.querySelector(`#input${i}`).value)
  }
  
  setTimeout(() => {
    axios.post(`http://localhost:3000/submit`, {words: wordArr, quizname: document.querySelector('#quizname').value})
    .then(a =>{
      console.log('Succes')
  }, 1000)
  })
  
})



const updateFields = document.getElementsByClassName("edit-fields")
const updateWords = document.getElementById("updateWords")
updateWords.addEventListener('click',()=>{
    console.log(updateFields.length,"++++=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=++++++++++")
}).catch(err=> console.log(err))