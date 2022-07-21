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
    <div>
      <button className='movie' onClick={e => clickFunction(e)}>{movie.name}</button>
      {/* {enabled && (<div><input type="text" placeholder='review'></input></div>)} */}
      {enabled && (<MovieRating movie={movie} />)}
    </div>
  )
}

export default MovieEle