import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { tmdbAPI } from "../../../api/tmdbAPI";
import s from "./Reviews.module.scss";

export const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const r = await tmdbAPI.get(`/movie/${movieId}/reviews`);
        setReviews(r.data.results);
      } catch (err) {
        console.error("Error getting reviews", err);
      }
    };

    getReviews();
  }, [movieId]);

  return (
    <section className={s.reviews}>
      {reviews.length > 0 ? (
        <ul className={s.reviews__list}>
          {reviews.map((review) => (
            <li key={review.id} className={s.reviews__item}>
              <h3 className={s.reviews__cuthor}>{review.author}</h3>
              <p className={s.reviews__content}>{review.content}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p className={s.reviews__empty}>There is no reviews</p>
      )}
    </section>
  );
};
