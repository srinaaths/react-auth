import axios from 'axios'
import React, { useState, useEffect } from 'react'
import MovieEle from './MovieEle'

const Dashboard = () => {
    const [bestRatedMovies, setBestRatedMovies] = useState([])
    useEffect(() => {
        const fetchBestRatedMovies = async () => {
            try {
                const res = await axios.get('http://localhost:8080/bestRatedMovie')
                setBestRatedMovies(res.data)
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchBestRatedMovies();
    }, [])
    return (
        <div>
            {bestRatedMovies.map(movie => {
                return (
                    <MovieEle key={movie.movieId} movie = {movie} />
                )
            })}
        </div>
    )
}

export default Dashboard