export const getGames = () => {
    return fetch("http://localhost:8000/games", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}

export const createGame = (game) => {
    return fetch("http://localhost:8000/games", {
        method: "POST",
        headers:{
            "Authorization": `Token ${localStorage.getItem("gr_token")}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(game)
    }).then(getGames)        
}

export const getCategories = () => {
    return fetch("http://localhost:8000/categories", {
        headers:{
            "Authorization": `Token ${localStorage.getItem("gr_token")}`
        }
    })
        .then(response => response.json())
}