import axios from 'axios'
import React, { useEffect, useState } from 'react'
import MovieEle from './MovieEle'
import './popular.scss'
import ReactPaginate from 'react-paginate';

const PopularMovies = () => {
    const [popularMovies, setPopularMovies] = useState([])
    const [pageCount, setPageCount] = useState(0);
    const [itemOffset, setItemOffset] = useState(0);
    const itemsPerPage = 5;
    useEffect(() => {
        const fetchPopularMovies = async () => {
            try {
                const res = await axios.get('http://localhost:8080/')
                setPopularMovies(res.data);
            } catch (error) {
                console.log(error.message);
            }
        }
        fetchPopularMovies();
        console.log('onceee');
    }, [])
    useEffect(() => {
        const endOffset = itemOffset + itemsPerPage;
        console.log(`Loading items from ${itemOffset} to ${endOffset}`);
        setPopularMovies(popularMovies.slice(itemOffset, endOffset));
        setPageCount(Math.ceil(popularMovies.length / itemsPerPage));
      }, [itemOffset, itemsPerPage]);
    const handlePageClick = (event) => {
        const newOffset = (event.selected * itemsPerPage) % popularMovies.length;
        console.log(
            `User requested page number ${event.selected}, which is offset ${newOffset}`
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
                    pageRangeDisplayed={5}
                    pageCount={pageCount}
                    previousLabel="< previous"
                    // renderOnZeroPageCount={null}
                />
            </div>
        </div>
    )
}

export default PopularMovies