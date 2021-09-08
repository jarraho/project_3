import React, { useState } from "react";
import "./searchMovies.css";
import MovieCard from "./movieCard.jsx";

export default function SearchMovies() {
  //states- input query, movies
  const [query, setQuery] = useState("");
  //create the state for movies, and update that state appropriate
  const [movies, setMovies] = useState([]);

  const searchMovies = async (e) => {
    e.preventDefault();
    //  `//https://api.themoviedb.org/3/movie/${id}?api_key=bda92193e0b38e55a75bfe36b27835c4&language=en-US`

    //If user doesnt enter anything in search
    if (query === "") {
      return;
    }

    const url = `https://api.themoviedb.org/3/search/movie?api_key=bda92193e0b38e55a75bfe36b27835c4&language=en-US&query=${query}&page=1&include_adult=false`;

    try {
      //its working here as well

      const res = await fetch(url);
      const data = await res.json();
      setMovies(data.results);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="searchMovies">
      <div className="moviesSearchSection">
        <center>
          <form className="form" onSubmit={searchMovies}>
            <label className="label" htmlFor="query">
              Movie Name
            </label>
            <div className="searchBar">
              <input
                className="input"
                type="text"
                name="query"
                placeholder="i.e. Jurassic Park"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
              />
              <button className="button" type="submit">
                Search
              </button>
            </div>
          </form>
        </center>
      </div>

      <div className="card-list">
        {movies
          .filter((movie) => movie.poster_path)
          .map((movie) => (
            <MovieCard movie={movie} key={movie.id} />
          ))}
      </div>
    </div>
  );
}
