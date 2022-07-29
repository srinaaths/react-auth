import React, { useEffect, useState, useRef } from 'react'
import Axios from 'axios';
import MovieEle from './MovieEle';
import './movies.css'
import './movieSearch.scss'
import { ArrowBackIos, ArrowForwardIos } from '@material-ui/icons';

function MovieSearch() {
    const [movies, setMovies] = useState([])
    const [searchText, setSearchText] = useState('')
    const [isMoved, setIsMoved] = useState(false);
    const [slideNumber, setSlideNumber] = useState(0);

    const listRef = useRef()

    const handleClick = (direction) => {
        setIsMoved(true);
        let distance = listRef.current.getBoundingClientRect().x - 50;
        console.log(slideNumber);
        if (direction === 'left' && slideNumber > 0) {
            setSlideNumber(slideNumber - 1);

            listRef.current.style.transform = `translateX(${230 + distance}px)`
        }
        console.log(distance)
        // console.log('size is ' + movies.length);
        if (direction === 'right' && slideNumber < movies.length /5) {
            setSlideNumber(slideNumber + 1);

            listRef.current.style.transform = `translateX(${-230 + distance}px)`
        }
    }
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
            <input type="text" className='search' placeholder='Search' onChange={e => updateSearchTerm(e)} />
            <div className='movie-ele'>
                <ArrowBackIos className='back-icon' onClick={() => handleClick('left')}></ArrowBackIos>
                <div className='movie-container' ref={listRef}>
                    {movies.filter(movie => {
                        return (searchText === '' || movie.name.toLowerCase().includes(searchText.toLowerCase()))
                    }).map(movie => {
                        return (
                            <MovieEle key={movie.id} movie={movie}></MovieEle>
                        )
                    })}
                </div>
                <ArrowForwardIos className='forward-icon' onClick={() => handleClick('right')}></ArrowForwardIos>
            </div>
        </div>
    )
}

export default MovieSearch