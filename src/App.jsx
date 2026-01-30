import { Routes, Route } from "react-router-dom";

import { HomePage } from "./pages/HomePage/HomePage";
import { MoviesPage } from "./pages/MoviesPage/MoviesPage";
import { MovieDetailsPage } from "./pages/MovieDetailsPage/MovieDetailsPage";
import { Cast } from "./pages/MovieDetailsPage/Cast/Cast";
import { Reviews } from "./pages/MovieDetailsPage/Reviews/Reviews";

import './index.css';


function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="movies" element={<MoviesPage />} />
        <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
          <Route path="cast" element={<Cast />} />
          <Route path="reviews" element={<Reviews />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
