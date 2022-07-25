import React, { useState } from 'react'
import './movieEle.scss'
import MovieRating from './MovieRating'
import { Rating } from 'react-simple-star-rating'
import store from './redux-components/store'
import axios from 'axios'

const MovieEle = ({ movie }) => {
  const [enabled, setEnabled] = useState(false)
  const [rating, setRating] = useState(0)
  const [enableReview, setEnableReview] = useState(false)
  const [review, setReview] = useState('')
  const [fetchedRating, setFetchedRating] = useState(0)
  const [fetchedReview, setFetchedReview] = useState(0)
  const [submittedReview, setSubmittedReview] = useState(0)

  const fetchRatingIfAlreadyExists = async () => {
    console.log('hitting');
    const userId = store.getState().id;
    try {
      const res = await axios.get(`http://localhost:8080/getratingbyuser/${userId}/${movie.id}`)
      console.log('the res is');
      console.log(res);
      setFetchedRating(res.data.rating * 10)
      setFetchedReview(res.data.review)
      console.log('fetched rating is ' + fetchedRating);
    } catch (error) {
      console.log(error.message);
    }
  }

  fetchRatingIfAlreadyExists()

  const clickFunction = (e) => {
    console.log('clicked');
    setEnabled(true)
  }
  const handleReview = (e) => {
    setReview(e.target.value);
    console.log('review set to ' + review);
  }
  const handleRating = async (rate) => {
    console.log('setting rate as ' + rate);
    setRating(rate / 10);
  }
  const handleSubmit = async () => {
    const data = {
      rating: rating,
      review: review,
      movieId: movie.id,
      userId: store.getState().id
    }
    console.log('data is ' + data);
    setSubmittedReview(true)
    const res = await axios.post('http://localhost:8080/addrating', data)
    alert('submitted')
    console.log(res);
  }

  const discardReview = async() => {
    console.log('discarding');
    setEnableReview(false);
  }

  return (
    <div className='movie-container-class'>
      {/* <button className='movie' onClick={e => clickFunction(e)}><img src={require("./movie.jpeg")} height='50' width='50' alt="" /> {movie.name}</button> */}
      {/* <button className='movie' onClick={e => {
        clickFunction(e)

      }}> */}
      <div className='movie-holder'>
        <img src='https://picsum.photos/200/300?random'
          height='150' width='150' alt="" /> <div>{movie.name}
          <Rating onClick={handleRating} ratingValue={fetchedRating}></Rating>
          {!enableReview && <button onClick={() => setEnableReview(true)}>Add Review</button>}
          {enableReview && !submittedReview && <textarea className='text-area' defaultValue={fetchedReview} onChange={e => handleReview(e)} />}
          {enableReview && !submittedReview && <button onClick={discardReview}>Discard</button>}
          <button onClick={handleSubmit}>Submit Review</button>
        </div>
      </div>

      {enabled && <MovieRating movie={movie} />}
    </div>
  )
}

export default MovieEle