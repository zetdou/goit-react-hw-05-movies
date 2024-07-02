import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import PropTypes from 'prop-types';

const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const fetchMovieCast = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=b29a82c40924d31dffca7bf941f12611`,
        );
        setCast(response.data.cast);
      } catch (error) {
        console.error("Error fetching movie cast", error);
      }
    };

    fetchMovieCast();
  }, [movieId]);

  return (
    <div>
      <h2>Cast</h2>
      <ul>
        {cast.map((actor) => (
          <li key={actor.cast_id}>
            {actor.profile_path && (
              <img
               src={`https://image.tmdb.org/t/p/w200${actor.profile_path}`}
               alt={`${actor.name} profile`}
               width="100"
             />
            )}
            {actor.name} as {actor.character}
          </li>
        ))}
      </ul>
    </div>
  );
};

Cast.PropTypes = {
  cast: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      profile_path: PropTypes.string.isRequired,
      characte: PropTypes.string.isRequired,
    })
  ).isRequired,
};

export default Cast;
