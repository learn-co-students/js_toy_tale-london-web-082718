class API {
    static init () {
      this.baseUrl = 'http://localhost:3000/toys'
    }
  
    static getToys () {
      return fetch(this.baseUrl)
        .then(resp => resp.json())
    }
  
    static getToy (id) {
      return fetch(`${this.baseUrl}/${id}`)
        .then(resp => resp.json())
    }
  
    static createToy (name, image, likes) {
      // 'POST'
      return fetch(this.baseUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          'name': name,
          'image': image,
          'likes': likes
        })
      }).then(resp => resp.json())
      .then(addNewToy(name, image, likes))
    }
  
    static deleteToy (id) {
      return fetch(`${this.baseUrl}/${id}`, {
        method: 'DELETE'
      })
    }
  
    static increaseLikes (id, increasedLike) {
      return fetch(`${this.baseUrl}/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 'likes': increasedLike })
      }).then(resp => resp.json())
    }
  
    static editToy (toy) {
      return fetch(`${this.baseUrl}/${toy.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(toy)
      }).then(resp => resp.json())
    }
  }
  
  API.init()