import { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import axios from 'axios';
import s from './MoviesPage.module.css';
import MovieList from '../../components/MovieList/MovieList';
import { fetchMoviesByQuery } from '../../Services/moviesAPI';

const MoviesPage = () => {
  const [movies, setMovies] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();

  const query = searchParams.get('query') || '';

  useEffect(() => {
    if (!query) return;

    async function fetchMovies() {
      try {
        const response = await fetchMoviesByQuery(query);
        setMovies(response.results);
      } catch (error) {
        console.error('Error fetching movies:', error);
      }
    }

    fetchMovies();
  }, [query]);

  const handleSearch = (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    const searchQuery = form.elements.query.value.trim();

    if (!searchQuery) return;
    setSearchParams({ query: searchQuery });
  };

  return (
    <div className={s.container}>
      <form onSubmit={handleSearch}>
        <input
          name="query"
          defaultValue={query}
          placeholder="Search for a movie..."
        />
        <button type="submit">Search</button>
      </form>
      {movies.length > 0 ? (
        <MovieList movies={movies} />
      ) : (
        <ul>
          {movies.map((movie) => (
            <li key={movie.id}>
              <Link to={`/movies/${movie.id}`}>{movie.title}</Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MoviesPage;
