import React, { useState } from 'react'
import './movieEle.css'

const MovieEle = ({ movie }) => {
  const [enabled, setEnabled] = useState(false)
  const clickFunction = (e) => {
    console.log('clicked');
  }
  return (
    <div>
      <button className='movie' onClick={e => clickFunction(e)}>{movie.name}</button>
    </div>
  )
}

export default MovieEle