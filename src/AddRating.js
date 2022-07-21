import { useEffect, useState } from "react";
import axios from "axios";
import store from "./redux-components/store";

function AddRating() {
    const [movies, setMovies] = useState([])
    const [rating, setRating] = useState(0)
    const [review, setReview] = useState('')
    const [movieId, setMovieId] = useState(0)
    const [currentPage, setCurrentPage] = useState(1)
    const [moviesPerPage, setMoviessPerPage] = useState(10)

    useEffect(() => {
        const fetchMovies = async () => {
            const res = await axios.get('http://localhost:8080/')
            setMovies(res.data);
        }
        fetchMovies();
    }, [])

    const indexOfLastPost = currentPage * moviesPerPage;
    const indexOfFirstPost = currentPage * moviesPerPage;

    const submitRating = async () => {
        const data = {
            rating: rating,
            review: review,
            movieId: movieId,
            userId: store.getState().id
        }
        console.log('data is ' + data);
        const res = await axios.post('http://localhost:8080/addrating', data)
        console.log(res);
    }
    return (
        // (store.getState() != null && store.getState().authStatus) ?
            <div>
                {/* {console.log(movies)} */}
                {movies.map(movie => <div key={movie.id}>
                    {movie.name}
                    <br />
                    <label htmlFor="">Rating</label>
                    <input type="number" onChange={(e) => {
                        setRating(e.target.value)
                        setMovieId(movie.id)
                    }} />
                    <br />
                    <label htmlFor="">Review</label>
                    <input type="text" onChange={(e) => {
                        setReview(e.target.value)
                        setMovieId(movie.id)
                    }
                    } />
                    <input type="submit" onClick={submitRating} />
                    <br />
                    <br />
                </div>)}
            </div> 
            // : <div>not authorized</div>
    );
}

export default AddRating;