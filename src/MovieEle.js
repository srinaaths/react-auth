import React, { useState } from 'react'
import './movieEle.css'
import MovieRating from './MovieRating'

const MovieEle = ({ movie }) => {
  const [enabled, setEnabled] = useState(false)
  const clickFunction = (e) => {
    console.log('clicked');
    setEnabled(true)
  }
  return (
    <div className='movie-container-class'>
      <button className='movie' onClick={e => clickFunction(e)}><img src={require("./movie.jpeg")} height='50' width='50' alt="" /> {movie.name}</button>
      {enabled && (<MovieRating movie={movie} />)}
    </div>
  )
}

export default MovieEle