import { Header } from "../../components/Header/Header";
import { Container } from "../../components/Container/Container";

import { useState, useEffect } from "react";

import { Outlet, useParams, useNavigate, NavLink } from "react-router-dom";

import { tmdbAPI } from "../../api/tmdbAPI";

import s from "./MovieDetailsPage.module.scss";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const r = await tmdbAPI.get(`/movie/${movieId}`);
        setMovieDetails(r.data);
      } catch (err) {
        console.error("Error getting detailed movie's info", err);
      }
    };

    getMovieDetails();
  }, [movieId]);

  return (
    <>
      <Header />
      <main>
        <section className={s.movie}>
          <Container>
            <button className={s.movie__backBtn} onClick={() => navigate(-1)} aria-label="Go back">
              Go back
            </button>

            <div className={s.movie__content}>
              <img className={s.movie__poster} src={movieDetails.poster_path ? `${IMAGE_BASE}${movieDetails.poster_path}` : "https://i.pinimg.com/736x/eb/6a/68/eb6a68796cc4f9fb1a4ee1677426fa98.jpg"} alt={movieDetails.title} />

              <div className={s.movie__info}>
                <h1 className={s.movie__title}>{movieDetails.title}</h1>

                {movieDetails.genres && movieDetails.genres.length > 0 && (
                  <div className={s.movie__genres}>
                    {movieDetails.genres.map((genre) => (
                      <span key={genre.id} className={s.movie__genreItem}>
                        {genre.name}
                      </span>
                    ))}
                  </div>
                )}

                <p className={s.movie__overview}>{movieDetails.overview}</p>

                <div className={s.movie__meta}>
                  <span>{movieDetails.vote_average?.toFixed(1)}</span>
                  <span>{movieDetails.release_date}</span>
                </div>
              </div>
            </div>

            <nav className={s.movie__nav}>
              <NavLink to="cast" className={({ isActive }) => (isActive ? `${s.movie__navLink} ${s.movie__navLinkActive}` : s.movie__navLink)}>
                Cast
              </NavLink>

              <NavLink to="reviews" className={({ isActive }) => (isActive ? `${s.movie__navLink} ${s.movie__navLinkActive}` : s.movie__navLink)}>
                Reviews
              </NavLink>
            </nav>

            <div className={s.movie__outlet}>
              <Outlet />
            </div>
          </Container>
        </section>
      </main>
    </>
  );
};
