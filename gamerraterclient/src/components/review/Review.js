// Displays the review for each game displaying the review and username and each review submitted for that game
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getReviews } from "./ReviewManager";

export const Review = ({gameId}) => {
    // useState for reviews
    const [reviews, setReviews] = useState([])
    // initialize reviews based on incoming gameId
    useEffect(
        () => {
            getReviews(gameId)
                .then((data) =>
                    setReviews(data))
        },
        [gameId]
    )

    // iterate through reviews, display review and user name
    return(
        <>
        <section className={`${gameId}--reviews`}>
            {reviews.map(
                (review) =>
                 { return <div className={`review--${review.id}`}>
                     {review.review} by {review.player.user.username}
                 </div>
                    
                })}
        </section>
        </>
    )
}