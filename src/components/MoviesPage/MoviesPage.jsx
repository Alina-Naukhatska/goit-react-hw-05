import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import s from './MoviesPage.module.css';
import { fetchMoviesByQuery } from '../../Services/moviesAPI';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSearch = async (e) => {
    e.preventDefault();
    const response = await fetchMoviesByQuery(query);
    setMovies(response.results);
    setSearchParams({ query });
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>
      <ul>
        {movies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MoviesPage;
