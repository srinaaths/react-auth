import React, { useEffect, useState } from 'react'
import './movieEle.scss'
import MovieRating from './MovieRating'
import { Rating } from 'react-simple-star-rating'
import store from './redux-components/store'
import axios from 'axios'

const MovieEle = ({ movie }) => {
  let movieeId = movie.id;
  let movieName = movie.name;
  const [nameEnabled, setNameEnabled] = useState(false)
  useEffect(() => {
    console.log('in use effect');
    const fetchName = async () => {
      if (!movieName) {
        try {
          console.log('in try');
          const res = await axios.get(`http://localhost:8080/${movie.movieId}`)
          movieName = res.data.name;
          movie.name = movieName
          console.log('check');
          console.log(movieName);
          console.log('check');
          setNameEnabled(true)
        } catch (error) {
          console.log(error.message);
        }
      }
      else
        console.log('in else');
    }
    fetchName();
  }
  , [])
  if (!movieeId)
    movieeId = movie.movieId;
  const [enabled, setEnabled] = useState(false)
  const [rating, setRating] = useState(0)
  const [enableReview, setEnableReview] = useState(false)
  const [review, setReview] = useState('')
  const [fetchedRating, setFetchedRating] = useState(0)
  const [fetchedReview, setFetchedReview] = useState('')
  const [submittedReview, setSubmittedReview] = useState(0)

  const fetchRatingIfAlreadyExists = async () => {
    console.log('hitting');
    const userId = store.getState().id;
    try {
      const res = await axios.get(`http://localhost:8080/getratingbyuser/${userId}/${movieeId}`)
      console.log('the res is');
      console.log(res);
      setFetchedRating(res.data.rating * 10)
      setFetchedReview(res.data.review)
      console.log('fetched rating is ' + fetchedRating);

      // if (!movie.name) {
      //   console.log('in try');
      //   const res = await axios.get(`http://localhost:8080/${movie.movieId}`)
      //   console.log('ressss is');
      //   console.log(res);
      //   movieName = res.data.name;
      //   movie.name = movieName;
      //   console.log('check');
      //   console.log(movieName);
      //   console.log(movie.name);
      //   console.log('check');
      // }

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
    console.log(movie.movieId);
    const data = {
      rating: rating,
      review: review,
      movieId: movieeId,
      userId: store.getState().id
    }
    console.log('data is ' + data);
    setSubmittedReview(true)
    const res = await axios.post('http://localhost:8080/addrating', data)
    alert('submitted')
    console.log(res);
  }

  const discardReview = async () => {
    console.log('discarding');
    setEnableReview(false);
  }

  return (
   {nameEnabled }&& (<div className='movie-container-class'>
      {/* <button className='movie' onClick={e => clickFunction(e)}><img src={require("./movie.jpeg")} height='50' width='50' alt="" /> {movie.name}</button> */}
      {/* <button className='movie' onClick={e => {
        clickFunction(e)

      }}> */}
      <div className='movie-holder'>
        <img src='https://picsum.photos/200/300?random'
          height='150' width='150' alt="" /> <div>{movie.name ? movie.name : movieName}
          <div className="rating-class">
            <Rating onClick={handleRating} ratingValue={fetchedRating}></Rating>
            <div className="rating-buttons">
              {!enableReview && <button onClick={() => setEnableReview(true)}>Add Review</button>}
              {enableReview && !submittedReview && <textarea className='text-area' defaultValue={fetchedReview} onChange={e => handleReview(e)} />}
              {enableReview && !submittedReview && <button onClick={discardReview}>Discard</button>}
              <button onClick={handleSubmit}>Submit Review</button>
            </div>
          </div>
        </div>
      </div>

      {enabled && <MovieRating movie={movie} />}
    </div>)
   
  )
}

export default MovieEle