import { useState, useEffect } from "react";

import { NavLink } from "react-router-dom";

import { tmdbAPI } from "../../../api/tmdbAPI";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
export const PopularMovies = () => {
  const [popularMovies, setPopularMovies] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const getPopularMovies = async () => {
      try {
        const r = await tmdbAPI.get("/movie/popular", {
          params: { page },
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
    <section>
      <div>
        <ul>
          {popularMovies.map((movie) => {
            return (
              <NavLink to={`/movies/${movie.id}`} key={movie.id}>
                <img src={`${IMAGE_BASE}${movie.poster_path}`} alt={movie.original_title} />
                <h2>{movie.original_title}</h2>
              </NavLink>
            );
          })}
        </ul>
      </div>
    </section>
  );
};
