import React, { useEffect, useState } from 'react'
import Axios from 'axios';
import MovieEle from './MovieEle';
import './movies.css'

function MovieSearch() {
    const [movies, setMovies] = useState([])
    const [searchText, setSearchText] = useState('')
    useEffect(() => {
        const fetchData = async () => {
            const data = await Axios.get('http://localhost:8080/')
            setMovies(data.data)
        }
        fetchData();
    }, [])
    const updateSearchTerm = (e) => {
        setSearchText(e.target.value)
    }
    return (
        <div className='movies-list-class'>
            <input type="text" className='search' placeholder='Search' onChange={e => updateSearchTerm(e)}/>
            {movies.filter(movie => {
                // movie.name.toLowerCase().includes(searchText.toLowerCase())
                return (searchText === '' || movie.name.toLowerCase().includes(searchText.toLowerCase()) )
                // return true
            }).map(movie => {
                return (
                    // <Movie key={movie.id} movie = {movie}></Movie>
                        <MovieEle key={movie.id} movie={movie}></MovieEle>
                )
            })}
        </div>
    )
}

export default MovieSearch