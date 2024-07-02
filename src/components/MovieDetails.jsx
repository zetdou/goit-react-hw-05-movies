import React, { useState, useEffect } from 'react';
import { useParams, Link, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import Cast from './Cast';
import Reviews from './Reviews';

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}?api_key=b29a82c40924d31dffca7bf941f12611`
        ); 
        setMovie(response.data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };

    fetchMovieDetails();
  }, [movieId]);

  if (!movie) {
    return <div>Loading...</div>;
  }

  const posterURL = movie.poster_path ? `https://image.tmdb.org/t/p/w400${movie.poster_path}` : "";

  return (
    <div>
      <button onClick={() => navigate("/")}>Go Back</button>
      <h1>{movie.title}</h1>
      {posterURL && <img src={posterURL} alt={`${movie.title} poster`} />}
      <p>{movie.overview}</p>
      <ul>
        <li>
          <Link to="cast">Cast</Link>
        </li>
        <li>
          <Link to="reviews">Reviews</Link>
        </li>
      </ul>

      <Routes>
        <Route path="cast" element={<Cast />} />
        <Route path="reviews" element={<Reviews />} />
      </Routes>
    </div>
  );
};

MovieDetails.PropTypes = {
  movieID: PropTypes.string.isRequired,
};

export default MovieDetails;