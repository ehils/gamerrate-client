import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { Review } from "../review/Review";
import { getGameById } from "./GameManager";

export const GameDetail = () => {
    const [game, setGame] = useState([])
    const { gameId } = useParams()
    const history = useHistory()
    useEffect(
        () => {

            getGameById(gameId)
                .then((data) => {
                    setGame(data)
                }
                )
        },
        [gameId]
    )

    return (
        <>
            {
                <section>
                    <p>
                        <h1>
                            Title: {game.title}<br></br>
                        </h1>
                    </p>
                    <p>
                        Description: {game.description}<br></br>
                    </p>
                    <p>
                        Year Released: {game.yearReleased}<br></br>
                    </p>
                    <p>
                        Number of Players: {game.numberOfPlayers}<br></br>
                    </p>
                    <p>
                        Time to Play: {game.timeToPlay}<br></br>
                    </p>
                    <p>
                        Age Recommendation: {game.ageRecommendation}<br></br>
                    </p>
                    <p className="gameCategories">Game Categories: {game.categories?.map((category) => { return `${category.category}, ` })}</p>
                    {/* <button onClick={() => {
                history.push(`/games/edit/${game.id}`)
            }}>Edit</button> */}
                    <div className="edit_button">
                        {game.player?.id === parseInt(localStorage.getItem('userId')) ? <button onClick={() => {
                            history.push(`/games/edit/${game.id}`)
                        }}>Edit</button> : ''}
                    </div>
                    <button 
                    onClick={() => {
                        history.push({ pathname: `/games/${gameId}/reviews` })
                    }}>
                    Leave a Review!
                    </button>
                    <h2>Reviews</h2>
                    <div><Review gameId={gameId} /></div>
                </section>

            }
        </>
    )
}