class API {
    static getToys(){
        return fetch('http://localhost:3000/toys')
            .then(response => response.json())
    }

    static createNewToy(toy) {
        return fetch('http://localhost:3000/toys', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(toy)
        }).then(response => response.json())
    }

    static updateLike(id, like) {
        return fetch(`http://localhost:3000/toys/${id}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({'likes': like})
        }).then(response => response.json())
    }
}

