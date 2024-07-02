import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from '../styles/Cast.module.css';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=b29a82c40924d31dffca7bf941f12611`
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error('Error fetching cast:', error);
      }
    };

    fetchCast();
  }, [movieId]);

  return (
    <div className="container">
      <h2>Cast</h2>
      <ul className={styles.castList}>
        {cast.map((actor) => (
          <li key={actor.cast_id} className={styles.castItem}>
            {actor.profile_path ? (
              <img
                src={`https://image.tmdb.org/t/p/w500${actor.profile_path}`}
                alt={`${actor.name}`}
                className={styles.profileImage}
              />
            ) : (
              <div className={styles.noImage}>No Image Available</div>
            )}
            <div className={styles.actorName}>{actor.name}</div>
            <div className={styles.characterName}>{actor.character}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

Cast.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default Cast;