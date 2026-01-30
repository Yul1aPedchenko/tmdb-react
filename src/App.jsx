import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

import "./index.css";

const HomePage = lazy(() => import("./pages/HomePage/HomePage").then((module) => ({ default: module.HomePage })));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage").then((module) => ({ default: module.MoviesPage })));
const MovieDetailsPage = lazy(() => import("./pages/MovieDetailsPage/MovieDetailsPage").then((module) => ({ default: module.MovieDetailsPage })));
const Cast = lazy(() => import("./pages/MovieDetailsPage/Cast/Cast").then((module) => ({ default: module.Cast })));
const Reviews = lazy(() => import("./pages/MovieDetailsPage/Reviews/Reviews").then((module) => ({ default: module.Reviews })));

function App() {
  return (
    <Suspense fallback={<div>Loading page...</div>}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="movies" element={<MoviesPage />} />
        <Route path="movies/:movieId" element={<MovieDetailsPage />}>
          <Route
            path="cast"
            element={
              <Suspense fallback={<div>Loading cast...</div>}>
                <Cast />
              </Suspense>
            }
          />
          <Route
            path="reviews"
            element={
              <Suspense fallback={<div>Loading reviews...</div>}>
                <Reviews />
              </Suspense>
            }
          />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
