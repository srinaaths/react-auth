import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MovieEle from './MovieEle'
import './popular.scss'

const PopularMovies = () => {
    const [popularMovies, setPopularMovies] = useState([])
    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const res = await axios.get('http://localhost:8080/bestRatedMovie')
                setPopularMovies(res.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchPopularMovies();
    }, [])
    return (
        <div className='movie-container'>
            {
                popularMovies.map(movie => 
                    <MovieEle movie = {movie}></MovieEle>
                )
            }
        </div>
    )
}

export default PopularMovies