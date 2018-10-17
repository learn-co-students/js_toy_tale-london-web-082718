const addBtn = document.querySelector('#new-toy-btn')
const toyForm = document.querySelector('.container')

const toyColl = document.querySelector('#toy-collection')
const addToyForm = document.querySelector('.add-toy-form')
const textInputs = document.querySelectorAll('.input-text')

let addToy = false

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
// OR HERE!

function appendToys(toys){  
  toys.forEach(toy => {
    appendToy(toy)
  })
}


function appendToy(toy) {

  const toyDiv = document.createElement('div')
  toyDiv.id = toy.id
   //add toy to toy div
   toyDiv.innerHTML = `
   <div  class="card">
    <h2>${toy.name}</h2>
    <img src=${toy.image} class="toy-avatar">
    <p id=${toy.name}>${toy.likes} Likes <p>
    <button class="like-btn">o_O Like O_o</button>
  </div>
  `

   //append to toy collection
   toyColl.appendChild(toyDiv)

    const butt = toyDiv.querySelector('button')
    butt.addEventListener('click', event => {
      // debugger
      
      // console.log(toy.likes)
      
      const p = document.querySelector(`#${toy.name}`)

      let ali = ++toy.likes

      p.innerText = `${ali} Likes`

      API.updateLike(toyDiv.id, ali)


    })
    
}

addToyForm.addEventListener('submit', event => {
  event.preventDefault()
  const name = textInputs[0].value
  const url = textInputs[1].value

  const toy = {
    name: name,
    image: url,
    likes: 0
  }
  
  appendToy(toy)
  API.createNewToy(toy)

})

API.getToys().then(toys => appendToys(toys))
