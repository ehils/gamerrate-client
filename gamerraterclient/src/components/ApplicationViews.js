import React from "react"
import { Route } from "react-router-dom"
import { GameDetail } from "./game/GameDetail"
import { GameForm } from "./game/GameForm"
import { GameList } from "./game/GameList"

export const ApplicationViews = () => {
    return <>
        <main style={{
            margin: "5rem 2rem",
            lineHeight: "1.75rem"
        }}>
            <Route exact path="/games">
                <GameList />
            </Route>
            <Route exact path="/">
            </Route>
            <Route exact path="/games/:gameId(\d+)">
                <GameDetail />
            </Route>
            <Route exact path="/games/create">
                <GameForm />
            </Route>
            <Route path="/games/edit/:gameId(\d+)">
                <GameForm />
            </Route>
            <Route exact path="/games/:gameId(\d+)/review">
                
            </Route>
            {/* <Route exact path="/events/new">
                <EventForm />
            </Route>
            <Route exact path="/games/edit/:gameId(\d+)">
                <UpdateGameDetails />
            </Route>
            <Route exact path="/events/edit/:eventId(\d+)">
                <UpdateEventDetails />
            </Route> */}
        </main>
    </>
}