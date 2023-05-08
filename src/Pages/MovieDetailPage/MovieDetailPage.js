import React, { useState, useEffect } from "react";
import { useParams, Link} from "react-router-dom";

function MovieDetails() {
  const [movie, setMovie] = useState({});
  const { imdbID } = useParams();

  useEffect(() => {
    const fetchMovieData = async () => {
      const response = await fetch(`http://sefdb02.qut.edu.au:3000/movies/data/${imdbID}`);
      const data = await response.json();
      setMovie(data);
    };
    fetchMovieData();
  }, [imdbID]);

  return (
    <div>
      <h2>{movie.title}</h2>
      <p>Year: {movie.year}</p>
      <p>Runtime: {movie.runtime} minutes</p>
      {movie.genres && (
      <p>Genres: {movie.genres.join(", ")}</p>
      )}
      <p>Country: {movie.country}</p>
      {movie.principals && (
        <table>
          <thead>
            <tr>
              <th>Role</th>
              <th>Name</th>
              <th>Characters</th>
            </tr>
          </thead>
          <tbody>
            {movie.principals.map((principal) => (
              <tr key={principal.id}>
                <td>{principal.category}</td>
                <td><Link to={`/people/id/${principal.id}`}>{principal.name}</Link></td>
                <td>{principal.characters.join(", ") || "N/A"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {movie.ratings && (
        <table>
            <thead>
                <tr>
                    <th>Source</th>
                    <th>Value</th>
                </tr>
            </thead>
            <tbody>
                {movie.ratings.map((ratings) => (
                  <tr>
                   <td>{ratings.source}</td>
                   <td>{ratings.value}</td>
                  </tr>
                ))}
            </tbody>
        </table>
        )
      }

      <p>Boxoffice: {movie.boxoffice}</p>

      <p>
        {movie.poster && (
            <img src={movie.poster} alt="Movie's poster" />
        )}
      </p>

      <p>Plot: {movie.plot}</p>
      

    </div>
  );
}

export default MovieDetails;