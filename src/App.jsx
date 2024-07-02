import React, { lazy, Suspense } from "react";
import { Routes, Route, Link, Navigate } from "react-router-dom";

const Home = lazy(() => import("./components/Home"));
const Movies = lazy(() => import("./components/Movies"));
const MovieDetails = lazy(() => import("./components/MovieDetails"));
const Cast = lazy(() => import("./components/Cast"));
const Reviews = lazy(() => import("./components/Reviews"));

const App = () => {
  return (
    <div className="app-container">
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/goit-react-hw-05-movies/">Home</Link>
            </li>
            <li>
              <Link to="/goit-react-hw-05-movies/movies">Movies</Link>
            </li>
          </ul>
        </nav>
      </header>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/goit-react-hw-05-movies/" element={<Home />} />
          <Route path="/goit-react-hw-05-movies/movies" element={<Movies />} />
          <Route path="/goit-react-hw-05-movies/movies/:movieId/*" element={<MovieDetails />}>
            <Route path="cast" element={<Cast />} />
            <Route path="reviews" element={<Reviews />} />
          </Route>
          <Route
            path="*"
            element={<Navigate to="/goit-react-hw-05-movies/" />}
          />
        </Routes>
      </Suspense>
    </div>
  );
};

export default App;
