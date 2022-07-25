import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MovieEle from './MovieEle'
import './MovieGenreFilter.css'

const MovieGenreFilter = () => {
    const [movies, setMovies] = useState([])
    const [genre, setGenre] = useState('Adventure')
    const [moviesByGenre, setMoviesByGenre] = useState([])
    useEffect(() => {
        const fetchMovies = async () => {
            const res = await axios.get('http://localhost:8080/')
            setMovies(res.data)
        }
        const genreList = async () => {
            const res = await axios.get('http://localhost:8080/')
            setMovies(res.data)
        }
        fetchMovies();
    }, [])

    const filterByGenre = async () => {
        const prefixUrl = 'http://localhost:8080/getMoviesByGenre/'
        const selectedGenre = genre;
        const url = prefixUrl + selectedGenre;
        try {
            const res = await axios.get(url);
            setMoviesByGenre(res.data)
        } catch (error) {
            console.log(error.message);
        }
    }

    const genreChange = (e) => {
        setGenre(e.target.value);
    }

    return (
        <div className='main-container-class'>
            {console.log(movies)}
            {console.log(moviesByGenre)}
            {/* <input type="text" onChange={e => genreChange(e)}/> */}
            <select className='options-class' name="" id="" onChange={e => genreChange(e)}>
                <option value="Adventure">Adventure</option>
                <option value="Action">Action</option>
                <option value="Drama">Drama</option>
                <option value="Comedy">Comedy</option>
                <option value="Thriller">Thriller</option>
            </select>
            <div className="movie-container">
                <input className='submit-class' value='Search Movies' type="submit" onClick={filterByGenre} />
                {moviesByGenre.map(movie => { return (<MovieEle key={movie.id} movie={movie}></MovieEle>) })}
            </div>
        </div>
    )
}

export default MovieGenreFilter