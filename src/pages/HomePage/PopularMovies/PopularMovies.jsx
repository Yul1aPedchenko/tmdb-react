import { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";

import { tmdbAPI } from "../../../api/tmdbAPI";
import s from "./PopularMovies.module.scss";
import { Container } from "../../../components/Container/Container";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
export const PopularMovies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const r = await tmdbAPI.get("/movie/popular", {
          params: { page },
          include_adult: false,
        });

        setPopularMovies(r.data.results);
        // console.log(r.data.results);
      } catch (err) {
        console.error("Error getting popular movies", err);
      }
    };

    getPopularMovies();
  }, []);
  return (
    <section className={s.popular}>
      <Container>
        <ul className={s.popular__list}>
          {popularMovies.map((movie) => (
            <NavLink to={`/movies/${movie.id}`} key={movie.id} className={s.popular__item}>
              <img className={s.popular__img} src={movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : "https://i.pinimg.com/736x/eb/6a/68/eb6a68796cc4f9fb1a4ee1677426fa98.jpg"} alt={movie.original_title} />
              <h2 className={s.popular__title}>{movie.original_title}</h2>
            </NavLink>
          ))}
        </ul>
      </Container>
    </section>
  );
};
