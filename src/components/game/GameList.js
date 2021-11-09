import React, { useEffect, useState } from "react"
import { Link } from 'react-router-dom'
import { useHistory } from "react-router"
import { getGames } from "./GameManager.js"
import "./GameList.css"

export const GameList = (props) => {
    const [games, setGames] = useState([])
    const history = useHistory()

    useEffect(() => {
        getGames().then(data => setGames(data))
    }, [])

    return (
        <article className="games">
            <button className="btn btn-2 btn-sep icon-create"
                onClick={() => {
                    history.push({ pathname: "/games/new" })
                }}
            >Register New Game</button>

            {
                games.map((game) => {
                    return <section key={`game--${game.id}`} className="game">
                        <Link to={`/game/${game.id}`} className="game__title">{game.title}</Link> by {game.designer}
                        <div className="game__players">{game.number_of_players} players needed</div>
                        <div className="game__description">Description: {game.description}</div>
                        <div className="game__yearReleased">Year Released: {game.year_released}</div>
                        <div className="game__estimatedTimeToPlay">Description: {game.estimated_time_to_play}</div>
                        <div className="game__ageRecommendation">Age Recommendation: {game.age_recommendation}</div>
                    </section>
                })
            }
        </article>
    )
}
