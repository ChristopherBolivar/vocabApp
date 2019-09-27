document.addEventListener('DOMContentLoaded', () => {


var updatedWords = []
var updateFields = document.getElementsByClassName("edit-fields")
var updateWords = document.getElementById("updateWords")
var goBack = document.querySelector("#goback")
const newWordUpdate = document.getElementById("newWordUpdate")
var wordList = document.querySelector("#wordList")
var wordCount = 0




updateWords.addEventListener('click',(e)=>{
  e.preventDefault();
  for(let i = 0; i < updateFields.length;i++){
      updatedWords.push(updateFields[i].value)
  }

  const theID = e.currentTarget.dataset.id;
  setTimeout(() => {
    axios.post(`https://ironvocabapp.herokuapp.com/update`, {words: updatedWords, cardId: theID, quizname: document.querySelector('#quizname').value})
    .then(a =>{
      console.log('Succes')
    })
  }, 1000)
  

  document.querySelector("#goback").click()
  // console.log("did it work?")
})


newWordUpdate.addEventListener('click', () => {
  
  let somthing = document.createElement('input')
    somthing.setAttribute("class", "edit-fields mt-2")
    somthing.setAttribute("placeholder", "New Definition Word")
    wordList.appendChild(somthing)
    wordCount++
  })
})