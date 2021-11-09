import React from "react"
import { Route } from "react-router-dom"
import { Game } from "./game/Game.js"
import { GameForm } from "./game/GameForm.js"
import { GameList } from "./game/GameList.js"
import { ReviewForm } from "./game/ReviewForm.js"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/games">
                <GameList />
            </Route>
            <Route exact path="/games/new">
                <GameForm />
            </Route>
            <Route exact path="/game/:gameId(\d+)">
                <Game />
            </Route>
            <Route exact path="/game/:gameId(\d+)/review">
                <ReviewForm />
            </Route>
        </main>
    </>
}
