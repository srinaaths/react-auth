import axios from 'axios'
import React, { useState } from 'react'
const MovieRating = ({movie}) => {
    console.log(movie);
    const [movies, setMovies] = useState([])
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')
    const [movieId, setMovieId] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [moviesPerPage, setMoviessPerPage] = useState(10)
    const submitRating = async() => {
        console.log('movieId is ' + movieId);
        const data = {
          rating: rating,
          review: review,
          movieId: movieId,
          userId: 1
        }
        console.log('data is ' + data);
      const res = await axios.post('http://localhost:8080/addrating', data)
      console.log(res);
    }   
    return (
        <div>
            <label htmlFor="">Rating</label>
            <input type="number" onChange={(e) => {
                setRating(e.target.value)
                setMovieId(movie.id)
            }} />
            <br />
            <label htmlFor="">Review</label>
            <input type="text" onChange={(e) => {
                setReview(e.target.value)
                setMovieId(movie.id)
            }
            } />
            <br />
            <input type="submit" onClick={submitRating} />
        </div>
    )
}

export default MovieRating 