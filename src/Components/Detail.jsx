import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "./Details.css";
// import MovieCard from './movieCard.js';
export default function Detail() {
  const { movieId } = useParams();
  const [genres, setGenres] = useState()
  console.log(movieId);
  // const [query, setQuery] = useState('');
  //create the state for movies, and update that state appropriate
  const [movie, setMovie] = useState([]);
  useEffect(() => {
    const searchMovies = async () => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=bda92193e0b38e55a75bfe36b27835c4&language=en-US`;
      try {
        //giving some kind of error here
        const res = await fetch(url);
        const data = await res.json();
        console.log(data);
        setMovie(data);
        setGenres(data.genres)
      } catch (err) {
        console.error("Error Occured Here");
      }
    };
    searchMovies();
  }, [movieId]);

  return (
    <>
      {
        <div className="movieDetails">
          <h1 className="movieTitle">{movie?.title}</h1>

          <img
            className="card-image"
            src={`https://image.tmdb.org/t/p/w185_and_h278_bestv2/${movie?.poster_path}`}
            alt={movie?.title + " poster"}
          />
          <div className="details">
            <span className="genre">
              Genres : {genres ? genres.map((element) => {
                
                return element.name + "   ";
                
                }) : ""}
            </span>

            <span className="overview"> Overview: {movie?.overview}</span>
          </div>
        </div>
      }
    </>
  );
}
