import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { tmdbAPI } from "../../../api/tmdbAPI";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
export const Cast = () => {
  const { movieId } = useParams();
  const [cast, setCast] = useState([]);

  useEffect(() => {
    const getCast = async () => {
      try {
        const r = await tmdbAPI.get(`movie/${movieId}/credits`);

        setCast(r.data.cast);
        // console.log(r.data);
      } catch (err) {
        console.error("Error getting cast", err);
      }
    };

    getCast();
  }, [movieId]);
  return (
    <section>
      <h2>Cast</h2>
      <ul>
        {cast.map((actor) => (
          <li key={actor.cast_id}>
            <img src={`${IMAGE_BASE}${actor.profile_path}`} alt={actor.name} />
            <p>{actor.name}</p>
            <p>as {actor.character}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
