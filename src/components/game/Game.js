import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getCurrentUser } from "../APIManager";

export const Game = () => {
    const [game, setGame] = useState({})
    const [reviews, setReviews] = useState([])
    const history = useHistory()
    const currentUser = getCurrentUser()

    const getGames = () => {
        return fetch(`http://localhost:8000/games/${gameId}`, {
            headers:{
                "Authorization": `Token ${localStorage.getItem("gr_token")}`
            }
        })
            .then(response => response.json())
            .then((data) => {
                setGame(data)
            })
    }

    const getGameReviews = () => {
        return fetch("http://localhost:8000/reviews", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("gr_token")}`
            }
        })
            .then(response => response.json())
            .then((data) => {
                setReviews(data)
            })
    }

    const { gameId } = useParams()

    useEffect(
        () => {
            getGames()
        },
        []
    )

    useEffect(
        () => {
            getGameReviews()
        },
        []
    )

    return (
        <>
            <section className="modal">
                <div className="modal__header">
                    <h2>Game Details</h2>
                </div>
                <div className="game__details">
                    <div className="game__title">Title: {game.title} </div>
                        <div className="game__category">Category: {game?.category?.label} </div>
                        <div className="game__description">Description: {game.description} </div>
                        <div className="game__designer">Designer: {game.designer} </div>
                        <div className="game__year__released">Year Released: {game.year_released} </div>
                        <div className="game__number__of__players">Number of Players: {game.number_of_players} </div>
                        <div className="game__estimated__time__to__play">Estimated Time to Play: {game.estimated_time_to_play} </div>
                        <div className="game__age__recommendation">Age Recommendation: {game.age_recommendation} </div>
                        <div className="game__created__on">Created On: {game.created_on} </div>
                </div>
            </section>
            <section className="game__reviews">
                <h4 className="game__reviews__header">Reviews:</h4>
                <div className="game__review__button">
                    <button onClick={() => history.push(`/game/${game.id}/review`)}>Review Game</button>
                </div>
                <div className="game__reviews__display">
                    {
                        reviews.map(review => {
                                if (review.game.id === game.id) {
                                    return <div className="review__box" key={`review--${review.id}`}>
                                        <dl>
                                        <dt>#{review.id}</dt>
                                        <dt>{review.content}</dt>
                                        <dd>-{review.rater?.user?.username}</dd>
                                        </dl>
                                    </div>
                                } else {
                                    
                                }
                            }
                        ) 
                    }
                </div>
            </section>
        </>
    )

}