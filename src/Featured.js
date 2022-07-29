import axios from 'axios'
import React, { useState, useEffect } from 'react'
import './Featured.scss'
import MovieEle from './MovieEle'

const Featured = () => {
    const [featuredMovie, setFeaturedMovie] = useState()
    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const res = await axios.get('http://localhost:8080/featuredMovie')
                setFeaturedMovie(res.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchPopularMovies();
    }, [])
    console.log('featured movie is ');
    console.log(featuredMovie);
  return (
    <div className='main-container'>
        <div className="featured-header">
            <h1>Featured Movie Today</h1>
        </div>
        <div className="movie-container">
            {/* <MovieEle movie = {featuredMovie} /> */}
        </div>
    </div>
  )
}

export default Featured