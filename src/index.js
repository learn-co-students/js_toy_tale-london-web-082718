const addBtn = document.querySelector('#new-toy-btn')
const toyFormContainer = document.querySelector('.container')
const toyForm = document.querySelector('.add-toy-form')
const nameInput = document.querySelector('#input-name')
const imageInput = document.querySelector('#input-image')

const toyCollection = document.querySelector("#toy-collection")
const baseURL = 'http://localhost:3000/toys'
const header = {
  "Content-Type": "application/json",
  Accept: "application/json"
}

let addToy = false

function displayAllToys() {
  fetch(baseURL).then(resp => resp.json()).then(resp =>
    resp.forEach(toy => renderToy(toy)))
}

function removeAllToys() {
  while (toyCollection.firstChild) {
    toyCollection.removeChild(toyCollection.firstChild);
  }
}

function renderToy(toyData) {
  toyEl = document.createElement('div');
  toyEl.className = "card";
  toyEl.innerHTML =`
      <h2>${toyData.name}</h2>
      <img src=${toyData.image} class="toy-avatar">
        <p>${toyData.likes} Likes <p>
          <button id="like-btn-${toyData.id}" type="button">Like <3</button>
  `;
  toyCollection.appendChild(toyEl)
  toyEl.querySelector(`#like-btn-${toyData.id}`)
      .addEventListener('click', event =>
      updateToy(toyData))
}

function createToy(name, image) {
  let toyObj = {
    name,
    image,
    likes: 0
  };
  fetch(baseURL, {
    method: 'POST',
    headers: header,
    body: JSON.stringify(toyObj)
  }).then(renderToy(toyObj))
}

function updateToy(toyData) {
  toyData.likes = toyData.likes + 1
  console.log(toyData)
  fetch(baseURL + `/${toyData.id}`, {
    method: 'PUT',
    headers: header,
    body: JSON.stringify(toyData)
  }).then(resp => console.log(resp.json()))
    .then(removeAllToys)
    .then(displayAllToys)

}

toyForm.addEventListener('submit', () => {
  createToy(nameInput.value, imageInput.value)
})

addBtn.addEventListener('click', () => {
  // hide & seek with the form
  addToy = !addToy
  if (addToy) {
    toyFormContainer.style.display = 'block'
  } else {
    toyFormContainer.style.display = 'none'
  }
})

displayAllToys()