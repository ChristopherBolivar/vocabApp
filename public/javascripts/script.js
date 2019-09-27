document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

}, false);

var newWord = document.querySelector('#newWord')
var wordForm = document.querySelector('#createDeckForm')
var wordList = document.querySelector('#wordList')
var submit = document.querySelector('#submitWords')
var deckName = document.querySelector('#quizName')
var wordArr = []
// var addNewWord = document.createElement(`<input id="input${wordCount}" type="text">`)
var addNewWord = document.createElement(`INPUT`)

var wordCount = 0
newWord.addEventListener('click', () => {


let somthing = document.createElement('input')
somthing.setAttribute("class", "edit-fields mt-2")
somthing.setAttribute("placeholder", "New Definition Word")
somthing.setAttribute("id", `input${wordCount}`)
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
    axios.post(`https://ironvocabapp.herokuapp.com/submit`, {words: wordArr, quizname: document.querySelector('#quizname').value})
    .then(a =>{
      console.log('Succes')
      document.querySelector("#home").click()
  }, 1000)
  })
})



const updateFields = document.getElementsByClassName("edit-fields")
const updateWords = document.getElementById("updateWords")
updateWords.addEventListener('click',()=>{
    console.log(updateFields.length,"++++=-==-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=++++++++++")
})