import axios from 'axios'
import React, { useEffect, useState } from 'react'
import DirectorItem from './DirectorItem'
import MovieEle from './MovieEle'
import './Directors.scss'

const Directors = () => {
    const [directors, setDirectors] = useState([])
    const [selectedDirector, setSelectedDirector] = useState('')
    const [moviesByDirector, setMoviesByDirector] = useState([])
    useEffect(() => {
        const fetchDirectors = async () => {
            try {
                const res = await axios.get('http://localhost:8080/directors');
                setDirectors(res.data)
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchDirectors();
    }, [])
    const changeFunction = (e) => {
        setSelectedDirector(e.target.value)
        // try {
        //     const preUrl = 'http://localhost:8080/getMoviesByDirector/';
        //     const url = preUrl + selectedDirector;
        //     const res = await axios.get(url);
        //     setMoviesByDirector(res.data);
        // } catch (error) {
        //     console.log(error.message);
        // }
    }
    const fetchMoviesByDirector = async () => {
        console.log('selected dir is ' + selectedDirector);
        try {
            const preUrl = 'http://localhost:8080/getMoviesByDirector/';
            const url = (selectedDirector != '') ? (preUrl + selectedDirector) : directors ? (preUrl + directors[0].name) : 'null';
            console.log(url);
            const res = await axios.get(url);
            setMoviesByDirector(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div className='main-container-class'>
            <select className='options-class' onChange={(e) => {
                changeFunction(e)
            }}>
                {directors.map(director => {
                    return (

                        // <DirectorItem key={director.id} director = {director}></DirectorItem>
                        <option key={director.id} director={director}>{director.name}</option>
                    )
                })}
            </select>
            <input className='submit-class' type="submit" value='Get Movies' onClick={fetchMoviesByDirector} />
            <div className='movie-container'>
                {moviesByDirector.map(movie => {
                    return <MovieEle key={movie.id} movie={movie}></MovieEle>
                })}
            </div>
        </div>
    )
}

export default Directors