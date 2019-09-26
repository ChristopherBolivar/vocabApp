document.addEventListener('DOMContentLoaded', () => {

  console.log('IronGenerator JS imported successfully!');

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
    axios.post(`http://localhost:3000/update`, {words: updatedWords, cardId: theID, quizname: document.querySelector('#quizname').value})
    .then(a =>{
      console.log('Succes')
    })
  }, 1000)
  }).catch(err => console.log(err));

  goBack.click()
  console.log("did it work?")
})






}, false);
newWordUpdate.addEventListener('click', () => {
  
  let somthing = document.createElement('input')
    somthing.classList.add("edit-fields")
    somthing.classList.add("mt-2")
    wordList.appendChild(somthing)
    wordCount++
  })