const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
let addToy = false
const toyDiv = document.getElementById('toy-collection')
const toyFormEl = document.querySelector('.add-toy-form')
const toyName = document.getElementById('toy-name')
const toyURL = document.getElementById('toy-image-url')
// const likeToy = document.querySelector('.like-btn')
// let toyCount = 0


// YOUR CODE HERE


// PROMISES 
const getToys = () => 
  fetch("http://localhost:3000/toys")
    .then(resp => resp.json()) 

const createToy = toy =>
  fetch('http://localhost:3000/toys', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(toy)
}).then(resp => resp.json())
  
function updateToy(toyId, data) {
  fetch(`http://localhost:3000/toys/${toyId}`, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({likes: data})
    }).then(resp => resp.json())
}
    

// REST OF CODE
const renderAllToys = toys => {
  toys.forEach(renderToy)
}   

getToys()    
  .then(renderAllToys)


const renderToy = toy => {
  // let toyCount = 0
  const toyCard = document.createElement('div')
  toyCard.className = 'card'
  toyCard.innerHTML = `
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar">
    <p id=${toy.name} >${toy.likes}<p>
    <button class="like-btn" id=${toy.id}>Like <3</button>
  `
  toyDiv.append(toyCard)

  document.getElementById(`${toy.id}`).addEventListener('click', event => { 
    document.getElementById(`${toy.name.split(" ")[0]}`).innerText = parseInt(document.getElementById(`${toy.name.split(" ")[0]}`).innerText) + 1
    updateToy(toy.id, document.getElementById(`${toy.name.split(" ")[0]}`).innerText)
  
})

}


addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
    toyFormEl.addEventListener('submit', event => {
      event.preventDefault()
      const toy = {
        name: toyName.value, 
        image: toyURL.value,
        likes: 0
      }
    
    createToy(toy)
      .then(renderToy)
     
    event.target.reset()
    
    })
  } else {
    toyForm.style.display = 'none'
  }
})





// OR HERE!







    
