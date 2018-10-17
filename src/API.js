class API {
  static init () {
    this.baseUrl = 'http://localhost:3000/toys'
  }

  // url (this.baseurl) is a property of the API class

  static getToys () {
    return fetch(this.baseUrl)
      .then(resp => resp.json())
  }

  static getToy (id) {
    return fetch(`${this.baseUrl}/${id}`)
      .then(resp => resp.json())
  }

  static addToy (newToy) {           // newToy is a JSON object and gets added in the index.js function 
    return fetch(this.baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
        // ,Accept: "application/json"
      },

      body: JSON.stringify(newToy)
    }).then(resp => resp.json())
  }

  static editLikes(id, likes) { 
    return fetch(`${this.baseUrl}/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 'likes': likes })
    }).then(resp => resp.json())
  }

  static deleteToy (id) {
    return fetch(`${this.baseUrl}/${id}`, {
      method: 'DELETE'
    })
  }


}
API.init()
