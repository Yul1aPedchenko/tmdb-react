import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { tmdbAPI } from "../../../api/tmdbAPI";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
export const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const getReviews = async () => {
      try {
        const r = await tmdbAPI.get(`/movie/${movieId}/reviews`);

        setReviews(r.data.results);
        console.log(r.data.results);
      } catch (err) {
        console.error("Error getting reviews", err);
      }
    };

    getReviews();
  }, [movieId]);
  return (
    <section>
      <div>
        <ul>
          {reviews.map((review) => {
            return (
              <li key={review.id}>
                <h3>{review.author}</h3>
                <p>{review.content}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
