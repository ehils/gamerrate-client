import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Link, useParams } from "react-router-dom/cjs/react-router-dom.min";
import { getCategories, getGameById, createGame, updateGame } from "./GameManager";

export const GameForm = () => {
    const history = useHistory()
    const [currentGame, setCurrentGame] = useState({})
    const [checkedState, setCheckedState] = useState([])
    const [categories, setCategories] = useState([])
    const { gameId } = useParams()

    //    gameID exists? editmode
    const editMode = gameId ? true : false

    // use effect to initialize the state of the form
    useEffect(() => {
        if (editMode) {
            getGameById(gameId).then((res) => {
                // res.game_type = res.game_type.id
                setCurrentGame(res)
                let copy = res.categories.map(category => { return category.id })
                setCheckedState(copy)
            }).then(
                getCategories().then(data => setCategories(data)))
        } else {
            setCurrentGame({
                title: "",
                description: "",
                yearReleased: 0,
                numberOfPlayers: 0,
                timeToPlay: 0,
                ageRecommendation: 0,
                categories: []
            })
            getCategories().then(data => setCategories(data))
            
            

        }
        // TODO: Get the game types, then set the state
    }, [])

    // onchange function to update the value of form as they change
    const changeGameState = (event) => {
        // TODO: Complete the onChange function
        const newGame = Object.assign({}, currentGame)          // Create copy
        newGame[event.target.name] = event.target.value    // Modify copy
        setCurrentGame(newGame)
    }

    // function to update the state of the checked categories
    const checkedStateChange = (event) => {
        let copy = [...checkedState]
        if (copy.includes(parseInt(event.target.value))) {
            let index = copy.indexOf(parseInt(event.target.value))
            if (index > -1) {
                copy.splice(index, 1)
                setCheckedState(copy)
            }

        }
        else copy.push(parseInt(event.target.value))
        setCheckedState(copy)
    }
    


    // 'id', 'title', 'description', 'year_released', 'number_of_players', 'time_to_play', 'age_recommendation', 'player', 'categories'
    // function create game once user hits submit
    const makeGame = () => {

        if (categories === []) {
            window.alert("Please select a category")
        } else {
            if (editMode) {
                updateGame({
                    id: currentGame.id,
                    title: currentGame.title,
                    description: currentGame.description,
                    yearReleased: parseInt(currentGame.yearReleased),
                    numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                    timeToPlay: parseInt(currentGame.timeToPlay),
                    ageRecommendation: parseInt(currentGame.ageRecommendation),
                    categories: checkedState
                })
                    .then(() => history.push('/games'))
            } else {
                createGame({
                    title: currentGame.title,
                    description: currentGame.description,
                    yearReleased: parseInt(currentGame.yearReleased),
                    numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                    timeToPlay: parseInt(currentGame.timeToPlay),
                    ageRecommendation: parseInt(currentGame.ageRecommendation),
                    categories: checkedState
                })
                    .then(() => history.push('/games'))
            }
        }
    }

    return (
        <form className="gameForm">
            <h2 className="postForm__title">{editMode ? "Update Game" : "Register New Game"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    // {e => {
                    //     const copy = { ...currentGame }
                    //     copy.title = e.target.value
                    //     changeGameState(copy)
                    // }
                    // }
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="description">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="yearReleased">Year released: </label>
                    <input type="number" name="yearReleased" required autoFocus className="form-control"
                        // name and value need to match
                        value={currentGame.yearReleased}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="number" name="numberOfPlayers" required autoFocus className="form-control"
                        // name and value need to match
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="timeToPlay">{`Time To Play (in minutes)`}</label>
                    <input type="number" name="timeToPlay" required autoFocus className="form-control"
                        // name and value need to match
                        value={currentGame.timeToPlay}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="ageRecommendation">{`Age Recommendation (in years)`}</label>
                    <input type="number" name="ageRecommendation" required autoFocus className="form-control"
                        // name and value need to match
                        value={currentGame.ageRecommendation}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="field">
                    <label htmlFor="topicSelection" className="label">Game Categories: </label>
                    <ul>
                        {categories.map((category) => {
                            return (
                                <li key={category.id}>
                                    <div className="category-item">
                                        <input
                                            type="checkbox"
                                            id={`category-checkbox--${category}`}
                                            name={`name-${category.category}`}
                                            value={category.id}
                                            defaultValue={categories}
                                            onChange={checkedStateChange}
                                            checked={
                                                checkedState.includes(parseInt(category.id)) ?
                                                    true : false
                                            }
                                        />
                                        {/* state that is array, checked adds item to array
                                        add array of categories to game */}
                                        <label htmlFor={`custom-checkbox-${category.id}`}>{category.category}</label>
                                    </div>
                                </li>)
                        }
                        )}
                    </ul>
                </div>
            </fieldset>


            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    makeGame()
                }}
                className="btn btn-primary">{editMode ? "Save Updates" : "Create Post"}</button>
        </form>
    )
}

