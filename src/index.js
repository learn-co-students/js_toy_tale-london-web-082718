const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')
const toyCont = document.querySelector('#toy-collection')
const inputName = document.querySelector('#input-text-name')
const inputURL= document.querySelector('#input-text-url')
let addToy = false

const renderToy = function(toy){
  const cardDiv = document.createElement('div');
  cardDiv.className = "card";
  cardDiv.innerHTML = `
  <h2>${toy.name}</h2>
  <img src="${toy.image}" class="toy-avatar">
  <p id="like-${toy.id}">${toy.likes} Likes <p>
  <button class="like-btn" id="${toy.id}">Like <3</button>
  `
  toyCont.appendChild(cardDiv);
}

const addNewToy = function(name, image, likes){
  const cardDiv = document.createElement('div');
  cardDiv.className = "card";
  cardDiv.innerHTML = `
  <h2>${name}</h2>
  <img src="${image}" class="toy-avatar">
  <p>${likes} Likes <p>
  <button class="like-btn">Like <3</button>
  
  `
  toyCont.appendChild(cardDiv);
}

const renderToys = function(toys) {
  toys.forEach(renderToy)
}

API.getToys().then(renderToys)

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyForm.style.display = 'block'
    toyForm.addEventListener('submit', event => {
      event.preventDefault();
      let name = inputName.value;
      let image = inputURL.value;
      let likes = 0;
      API.createToy(name, image, likes)
    })
  } else {
    toyForm.style.display = 'none'
  }
})

document.addEventListener('click', event => {
  if (event.target.className === 'like-btn'){
    const id = event.target.id;
    const currentLikes = document.querySelector(`#like-${id}`).innerText
    const increasedLike = parseInt(currentLikes) + 1
    API.increaseLikes(id, increasedLike)
    
  }
})

