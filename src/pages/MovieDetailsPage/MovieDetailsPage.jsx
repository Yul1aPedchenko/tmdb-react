import { Header } from "../../components/Header/Header";

import { useState, useEffect } from "react";

import { Outlet } from "react-router-dom";
import { useParams } from "react-router-dom";
import { NavLink } from "react-router-dom";

import { tmdbAPI } from "../../api/tmdbAPI";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";
export const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const [movieDetails, setMovieDetails] = useState({});

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const r = await tmdbAPI.get(`/movie/${movieId}`);

        setMovieDetails(r.data);
        // console.log(r.data);
      } catch (err) {
        console.error("Error getting detailed movie's info", err);
      }
    };

    getMovieDetails();
  }, [movieId]);

  return (
    <>
    <Header />
      <div>
        {/* Probably on;y for now (doesn't work properly) */}
        <NavLink to='/'>Go back</NavLink> 
        <div>
          <img src={`${IMAGE_BASE}${movieDetails.poster_path}`} alt={movieDetails.title} />
          <h1>{movieDetails.title}</h1>
          <p>{movieDetails.overview}</p>
          <p> {movieDetails.vote_average}</p>
          <p> {movieDetails.release_date}</p>
        </div>

        <NavLink to='cast'>Cast</NavLink>
        <NavLink to='reviews'>Reviews</NavLink>
        <Outlet />
      </div>
    </>
  );
};
