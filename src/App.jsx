import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import './index.css';

const HomePage = lazy(() => import("./pages/HomePage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage/MovieDetailsPage"));
const Cast = lazy(() => import("./pages/MovieDetailsPage/Cast/Cast"));
const Reviews = lazy(() => import("./pages/MovieDetailsPage/Reviews/Reviews"));

function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
