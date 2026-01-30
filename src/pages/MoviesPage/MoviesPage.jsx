import { Header } from "../../components/Header/Header";

import { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";

import { NavLink } from "react-router-dom";

import { tmdbAPI } from "../../api/tmdbAPI";

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
          },
        });

        setMovies(r.data.results);
        // console.log(r.data.results);
      } catch (err) {
        console.error("Error getting movies", err);
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
        },
      });

      setMovies(r.data.results);
    } catch (err) {
      console.error("Error getting movies", err);
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
      <div>
        <div>
          <form>
            <input type="text" value={query} onChange={handleChange} placeholder="Search movie by name" />
          </form>

          <ul>
            {movies.map((movie) => (
              <NavLink to={`/movies/${movie.id}`} key={movie.id}>
                <img src={`${IMAGE_BASE}${movie.poster_path}`} alt={movie.original_title} />
                <h2>{movie.original_title}</h2>
              </NavLink>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};
