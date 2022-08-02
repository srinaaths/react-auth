import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MovieEle from './MovieEle'
import './popular.scss'
import ReactPaginate from 'react-paginate';

const PopularMovies = () => {
    const [popularMovies, setPopularMovies] = useState([])
    const [movies, setMovies] = useState([])
    const [pageCount, setPageCount] = useState(10);
    const [itemOffset, setItemOffset] = useState(0);
    const len = 50;
    const itemsPerPage = 7;
    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const res = await axios.get('http://localhost:8080/')
                // setPopularMovies(res.data);
                setMovies(res.data)
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchPopularMovies();
        console.log('onceee');
    }, [])
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log('movies are ');
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        const func = async () => {
            await setPopularMovies(popularMovies.slice(itemOffset, endOffset));
        }
        func();
        setPageCount(Math.ceil(popularMovies.length / itemsPerPage));
        console.log(pageCount)
    }, [itemOffset, itemsPerPage]);
    const handlePageClick = (page) => {
        console.log(page.selected);
        console.log('len is ' + popularMovies.length);
        const newOffset = (page.selected * itemsPerPage) % 50;
        console.log(
            `User requested page number ${page.selected}, which is offset ${newOffset}`
        );
        setItemOffset(newOffset);
    };

    const Display = ({ popularMovies }) => {
        return (
            <div className='movie-container'>
                {
                    popularMovies.map(movie =>
                        <MovieEle movie={movie}></MovieEle>
                    )
                }
            </div>
        )
    }

    return (
        <div className='mainn-container'>
            <Display popularMovies={popularMovies} />
            <div className="paginate-class">
                <ReactPaginate
                    breakLabel="..."
                    nextLabel="next >"
                    onPageChange={handlePageClick}
                    pageCount={50 / itemsPerPage}
                    previousLabel="< previous"
                    renderOnZeroPageCount={null}
                />
            </div>
        </div>
    )
}

export default PopularMovies