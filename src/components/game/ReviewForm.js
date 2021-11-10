import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getCurrentUser } from "../APIManager";
import { createReview, getReviews, getGames } from "./GameManager";

var currentDate = new Date(Date.now() + (8 * 86400000))
var newDateOptions = {
        day: "2-digit",
        year: "numeric",
        month: "2-digit"
}
var newDate = currentDate.toLocaleString("en-US", newDateOptions );

export const ReviewForm = () => {
    const [game, setGame] = useState([])
    const history = useHistory()
    const currentUser = getCurrentUser()
    const [currentReview, setCurrentReview] = useState({
        gameId: 0,
        content: "",
        createdOn: ""
    })

    useEffect(() => {
        getGames()
        .then(data => setGame(data))
    }, [])
    
    const { gameId } = useParams()
    

    // useEffect(
    //     () => {
    //         getReviews()
    //     },
    //     []
    // )

    const changeReviewState = (event) => {
        const newReviewState = { ...currentReview }
        newReviewState[event.target.name] = event.target.value
        setCurrentReview(newReviewState)
    }

    return (
        <>
            <form className="reviewForm">
            <h2 className="gameReview__title">Leave Review</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="content">Content: </label>
                    <input type="text" name="content" required autoFocus className="form-control"
                        value={currentReview.content}
                        onChange={changeReviewState}
                    />
                </div>
            </fieldset>

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const review = {
                        gameId: parseInt(gameId),
                        content: currentReview.content,
                        createdOn: newDate
                    }

                    // Send POST request to your API
                    createReview(review)
                        .then(() => history.push(`/game/${gameId}/review`))
                }}
                className="btn btn-primary">Post</button>
            </form>
        </>
    )
}