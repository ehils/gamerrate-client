import { fetchIt } from "../utils/FetchIt.js"

const API = "http://localhost:8000"

export const getReviews = (gameId) => fetchIt(`${API}/reviews?game=${gameId}`)

export const createReviews = reviews => fetchIt(`${API}/reviews`, "POST", reviews)
