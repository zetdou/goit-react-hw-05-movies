import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import styles from '../styles/Movies.module.css';

const Movies = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);

  const handleSearch = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.get(
        `https://api.themoviedb.org/3/search/movie?api_key=b29a82c40924d31dffca7bf941f12611&query=${query}`
      );
      setMovies(response.data.results);
    } catch (error) {
      console.error('Error searching movies', error);
    }
  };

  return (
    <div className="container">
      <h1>Search Movies</h1>
      <form onSubmit={handleSearch} className={styles.searchContainer}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie"
          className={styles.inputField}
        />
        <button type="submit" className={styles.searchButton}>Search</button>
      </form>
      <ul className={styles.movieList}>
        {movies.map((movie) => (
          <li key={movie.id} className={styles.movieItem}>
            <Link to={`/goit-react-hw-05-movies/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Movies;