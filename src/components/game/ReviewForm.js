import React, { useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { getCurrentUser } from "../APIManager";

export const ReviewForm = () => {
    const [review, setReview] = useState([])
    const history = useHistory()
    const currentUser = getCurrentUser()

    const getReviews = () => {
        return fetch("http://localhost:8000/reviews", {
            headers:{
                "Authorization": `Token ${localStorage.getItem("gr_token")}`
            }
        })
            .then(response => response.json())
            .then((data) => {
                setReview(data)
            })
    }
    
    const { gameId } = useParams()
    

    useEffect(
        () => {
            getReviews()
        },
        []
    )

    return (
        <>
            <div className="review__box">
                <div className="review__game">Game: {review.game?.title}</div>
                <div className="review__rater">Rater: {review.rater?.user?.username}</div>
                <div className="review__content">Review: {review.content}</div>
                <div className="review__createdOn">Created On: {review.created_on}</div>
            </div>
        </>
    )
}