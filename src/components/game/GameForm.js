import React, { useState, useEffect } from "react"
import { useHistory } from 'react-router-dom'
import { createGame, getGames } from './GameManager.js'


export const GameForm = () => {
    const history = useHistory()

    /*
        Since the input fields are bound to the values of
        the properties of this state variable, you need to
        provide some default values.
    */
    const [currentGame, setCurrentGame] = useState({
        title: "",
        description: "",
        designer: "",
        yearReleased: 0,
        numberOfPlayers: 0,
        estimatedTimeToPlay: "",
        ageRecommendation: 0,
        createdOn: ""
    })

    /*
        REFACTOR CHALLENGE START

        Can you refactor this code so that all property
        state changes can be handled with a single function
        instead of five functions that all, largely, do
        the same thing?

        One hint: [event.target.name]
    */
        const changeGameState = (event) => {
            const newGameState = { ...currentGame }
            newGameState[event.target.name] = event.target.value
            setCurrentGame(newGameState)
        }

    /* REFACTOR CHALLENGE END */

    return (
        <form className="gameForm">
            <h2 className="gameForm__title">Register New Game</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="title">Title: </label>
                    <input type="text" name="title" required autoFocus className="form-control"
                        value={currentGame.title}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="maker">Description: </label>
                    <input type="text" name="description" required autoFocus className="form-control"
                        value={currentGame.description}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="designer">Designer: </label>
                    <input type="text" name="designer" required autoFocus className="form-control"
                        value={currentGame.designer}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="yearReleased">Year Released: </label>
                    <input type="text" name="yearReleased" required autoFocus className="form-control"
                        value={currentGame.yearReleased}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="numberOfPlayers">Number of Players: </label>
                    <input type="text" name="numberOfPlayers" required autoFocus className="form-control"
                        value={currentGame.numberOfPlayers}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="estimatedTimeToPlay">Estimated Time to Play: </label>
                    <input type="text" name="estimatedTimeToPlay" required autoFocus className="form-control"
                        value={currentGame.estimatedTimeToPlay}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="ageRecommendation">Recommended Age: </label>
                    <input type="text" name="ageRecommendation" required autoFocus className="form-control"
                        value={currentGame.ageRecommendation}
                        onChange={changeGameState}
                    />
                </div>
            </fieldset>

            {/* TODO: create the rest of the input fields */}

            <button type="submit"
                onClick={evt => {
                    // Prevent form from being submitted
                    evt.preventDefault()

                    const game = {
                        title: currentGame.title,
                        description: currentGame.description,
                        designer: currentGame.designer,
                        yearReleased: parseInt(currentGame.yearReleased),
                        numberOfPlayers: parseInt(currentGame.numberOfPlayers),
                        estimatedTimeToPlay: currentGame.estimatedTimeToPlay,
                        ageRecommendation: parseInt(currentGame.ageRecommendation),
                        createdOn: Date.now().toString()
                    }

                    // Send POST request to your API
                    createGame(game)
                        .then(() => history.push("/games"))
                }}
                className="btn btn-primary">Create</button>
        </form>
    )
}