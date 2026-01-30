import { Header } from "../../components/Header/Header";
import { Container } from "../../components/Container/Container";

import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

import { NavLink } from "react-router-dom";

import { tmdbAPI } from "../../api/tmdbAPI";
import s from "./MoviesPage.module.scss";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
export const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getMovies = async () => {
      try {
        const r = await tmdbAPI.get("/search/movie", {
          params: {
            query: "cats",
            include_adult: false,
          },
        });

        setMovies(r.data.results);
      } catch (err) {
        console.error("Error getting movies", err);
        setMovies([]);
      }
    };

    getMovies();
  }, []);

  const fetchMovies = async (searchQuery) => {
    if (!searchQuery.trim()) {
      setMovies([]);
      return;
    }

    try {
      const r = await tmdbAPI.get("/search/movie", {
        params: {
          query: searchQuery,
          include_adult: false,
        },
      });

      setMovies(r.data.results);
    } catch (err) {
      console.error("Error getting movies", err);
      setMovies([]);
    }
  };

  const debouncedSearch = useCallback(
    debounce((value) => {
      fetchMovies(value);
    }, 500),
    [],
  );

  const handleChange = (e) => {
    const value = e.target.value;
    setQuery(value);
    debouncedSearch(value);
  };

  return (
    <>
      <Header />
      <main>
        <section className={s.movies}>
          <Container>
            <form className={s.movies__form}>
              <input className={s.movies__input} type="text" value={query} onChange={handleChange} placeholder="Search movie by name" />
            </form>

            {movies.length > 0 ? (
              <ul className={s.movies__list}>
                {movies.map((movie) => (
                  <NavLink to={`/movies/${movie.id}`} key={movie.id} className={s.movies__item}>
                    <img className={s.movies__img} src={movie.poster_path ? `${IMAGE_BASE}${movie.poster_path}` : "https://i.pinimg.com/736x/eb/6a/68/eb6a68796cc4f9fb1a4ee1677426fa98.jpg"} alt={movie.original_title} />
                    <h2 className={s.movies__title}>{movie.original_title}</h2>
                  </NavLink>
                ))}
              </ul>
            ) : (
              <p className={s.movies__empty}>Nothing found</p>
            )}
          </Container>
        </section>
      </main>
    </>
  );
};
