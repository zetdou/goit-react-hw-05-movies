import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import styles from '../styles/Reviews.module.css';

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=b29a82c40924d31dffca7bf941f12611`
        );
        setReviews(response.data.results);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, [movieId]);

  return (
    <div className="container">
      <h2>Reviews</h2>
      <ul className={styles.reviewList}>
        {reviews.map((review) => (
          <li key={review.id} className={styles.reviewItem}>
            <div className={styles.reviewAuthor}>{review.author}</div>
            <div className={styles.reviewContent}>{review.content}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

Reviews.propTypes = {
  movieId: PropTypes.string.isRequired,
};

export default Reviews;