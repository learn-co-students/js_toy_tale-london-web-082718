const addBtn = document.querySelector('#new-toy-btn')
const toyNameInput = document.getElementsByClassName('input-text')[0]
const toyImageInput = document.getElementsByClassName('input-text')[1]
const toyForm = document.querySelector('.container')
let addToy = false
let toysNotFromServer

let likeButtons = document.getElementsByClassName('like-btn')

// For rendering toys to the toysCollection area
const toyCollection = document.querySelector('#toy-collection')

// YOUR CODE HERE
function appendToy(toy) {
  const toyItem = renderToy(toy)
  toyCollection.appendChild(toyItem)
}

function appendToys (toys) {
  toys.forEach(toy => appendToy(toy))
}

function renderToy(toy) {
  const toyItem = document.createElement('div')
  toyItem.classList.add('card')
  toyItem.innerHTML = `
    <h2>${toy.name}</h2>
      <img src="${toy.image}" class="toy-avatar">
        <p>${toy.likes} Likes <p>
      <button class="like-btn" id="${toy.id}"> &hearts; </button> <br>
      <br>
      <button class="delete-button" id="delete_${toy.id}">DESTROY TOY</button>
    </div>
  `
  // Like functionality
  const buttonEl = toyItem.querySelector('.like-btn')
  const likeCountEl = toyItem.querySelector('p')
  buttonEl.addEventListener('click', () => {
    toy.likes++ // changing the value here doesn't change what's displayed on the page
    API.editLikes(toy.id, toy.likes)   // update the Likes on the server with the Patch request (Server side)
      .then(() => {                    // returning a Promise - which when succesful, will update the likes on the page (Client side)
        likeCountEl.innerText = `${toy.likes} Likes`
      })
  })

  // Delete functionality 
  const deleteToyButt = toyItem.querySelector('.delete-button')
  deleteToyButt.addEventListener('click', () => {
    API.deleteToy(toy.id)
      .then(toyItem.remove())
  })
  // return of the renderToy function
  return toyItem
}

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    // submit listener here
  } else {
    toyForm.style.display = 'none'
  }
})

// creates a new Toy
toyForm.addEventListener('submit', event => {
  event.preventDefault()
  const toyName = toyNameInput.value
  const toyImage = toyImageInput.value   
  let likes = 0
  const newToy = {   
    name: toyName,
    image: toyImage,
    likes: likes
  }
  API.addToy(newToy)  // added to db,json (server side) - calls on the addToy POST method
    .then(newToy => appendToy(newToy))           
    // append to page only iof newToy gets added to server correctly and promise
    // is resolved (client side)
  
  // equiv. to addToy(toyName, toyImage, likes)  - as newToy the object
  event.target.reset()   // resets the form 
})

// increase Toy likes
// event listener to the like button FOR EACH CARD

// Each card has a like  button  - this needs to increment the like count ++1 
// forEach 



// rendering the toys / calling the function
API.getToys()
  .then(toysFromServer => {
    toysNotFromServer = toysFromServer
    appendToys(toysFromServer)
  })
