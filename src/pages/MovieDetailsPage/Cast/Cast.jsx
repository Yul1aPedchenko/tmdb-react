import { useState, useEffect } from "react";

import { useParams } from "react-router-dom";

import { tmdbAPI } from "../../../api/tmdbAPI";
import s from "./Cast.module.scss";

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
    <section className={s.cast}>
      <ul className={s.cast__list}>
        {cast.map((actor) => (
          <li key={actor.cast_id} className={s.cast__item}>
            <img className={s.cast__img} src={actor.profile_path ? `${IMAGE_BASE}${actor.profile_path}` : "https://i.pinimg.com/736x/ae/b4/b9/aeb4b95df3c0de89171efaf9ca97d33f.jpg"} alt={actor.name} />
            <p className={s.cast__name}>{actor.name}</p>
            <p className={s.cast__character}>as {actor.character}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};
