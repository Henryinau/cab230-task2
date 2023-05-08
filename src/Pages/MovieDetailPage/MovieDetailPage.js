import React, { useState, useEffect } from "react";
import { useParams, Link} from "react-router-dom";
import './MovieDetailPage.css'
import Button from 'react-bootstrap/Button';

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
    <div className="MovieDetail-Container">
      <h1 className="title-movie">{movie.title}</h1>
      <div className="movie-info">
      <p >Year: {movie.year}</p>
      <p >Runtime: {movie.runtime} minutes</p>
      {movie.genres && ( 
      <p className="genre">Genres: {movie.genres.join("  ")}</p>
      )}
      <p>Country: {movie.country}</p>
      <p>Boxoffice: {movie.boxoffice}</p>
      </div>
      {movie.principals && (
        <table className='table-MD'>
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
        <table className="table-rating">
           
            <tbody>
                {movie.ratings.map((ratings) => (
                  <tr>
                   <td>{ratings.source}: </td>
                   <td>{ratings.value}</td>
                  </tr>
                ))}
            </tbody>
        </table>
        )
      }

      

      <p>
        {movie.poster && (
            <img className='image' src={movie.poster} alt="Movie's poster" />
        )}
      </p>
      
      <div className="plot">
      <p>{movie.plot}</p>
      </div>
      
      

    </div>
  );
}

export default MovieDetails;