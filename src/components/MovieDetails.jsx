import React, { useState, useEffect } from 'react';
import { useParams, Link, Route, Routes, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cast from './Cast';
import Reviews from './Reviews';
import PropTypes from 'prop-types';
import styles from '../styles/MovieDetails.module.css';

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

  const posterUrl = movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : '';

  return (
    <div className="container">
      <button onClick={() => navigate('/')} className={styles.goBackButton}>
        Go Back
      </button>
      <h1 className={styles.heading}>{movie.title}</h1>
      {posterUrl && <img src={posterUrl} alt={`${movie.title} poster`} className={styles.poster} />}
      <p className={styles.overview}>{movie.overview}</p>
      <ul className={styles.links}>
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

MovieDetails.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default MovieDetails;