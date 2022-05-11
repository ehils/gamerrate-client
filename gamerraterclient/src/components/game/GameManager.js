import { fetchIt } from "../utils/FetchIt.js"

const API = "http://localhost:8000"

export const getGames = () => fetchIt(`${API}/games`)

export const createGame = game => fetchIt(`${API}/games`, "POST", game)

export const getCategories = () => fetchIt(`${API}/categories`)

export const updateGame = game => fetchIt(`${API}/games/${game.id}`, "PUT", game)

export const getGameById = game => fetchIt(`${API}/games/${game}`)

export const deleteGame = game => fetchIt(`${API}/games/${game.id}`, "DELETE")