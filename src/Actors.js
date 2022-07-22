import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MovieEle from './MovieEle'

const Actors = () => {
    const [actors, setactors] = useState([])
    const [selectedactor, setSelectedactor] = useState('')
    const [moviesByactor, setMoviesByactor] = useState([])
    useEffect(() => {
        const fetchactors = async () => {
            try {
                const res = await axios.get('http://localhost:8080/actors');
                setactors(res.data)
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchactors();
    }, [])
    const changeFunction = (e) => {
        setSelectedactor(e.target.value)
        // try {
        //     const preUrl = 'http://localhost:8080/getMoviesByactor/';
        //     const url = preUrl + selectedactor;
        //     const res = await axios.get(url);
        //     setMoviesByactor(res.data);
        // } catch (error) {
        //     console.log(error.message);
        // }
    }
    const fetchMoviesByactor = async () => {
        console.log('selected dir is ' + selectedactor);
        try {
            const preUrl = 'http://localhost:8080/getMoviesByactor/';
            const url = (selectedactor != '') ? (preUrl + selectedactor) : actors ? (preUrl + actors[0].name) : 'null';
            console.log(url);
            const res = await axios.get(url);
            setMoviesByactor(res.data);
            console.log(res.data);
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div>
            <select onChange={(e) => {
                changeFunction(e)
            }}>
                {actors.map(actor => {
                    return (

                        // <actorItem key={actor.id} actor = {actor}></actorItem>
                        <option key={actor.id} actor={actor}>{actor.name}</option>
                    )
                })}
            </select>
            <input type="submit" value='Get Movies' onClick={fetchMoviesByactor} />
            <div>
                {moviesByactor.map(movie => {
                    return <MovieEle key={movie.id} movie={movie}></MovieEle>
                })}
            </div>
        </div>
    )
}

export default Actors