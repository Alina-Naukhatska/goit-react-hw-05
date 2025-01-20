import { useState, useEffect } from 'react';
import { fetchMoviesByQuery } from '../../Services/moviesAPI';
import MovieList from '../../components/MovieList/MovieList';

const MoviesPage = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!query) return;

    setLoading(true);
    try {
      const data = await fetchMoviesByQuery(query);
      if (Array.isArray(data.results)) {
        setMovies(data.results);
      } else {
        console.error('The data is not an array:', data);
      }
    } catch (error) {
      console.error('Error searching for movies:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const searchMovies = async () => {
      if (query) {
        setLoading(true);
        try {
          const data = await fetchMoviesByQuery(query);
          if (Array.isArray(data.results)) {
            setMovies(data.results);
          } else {
            console.error('The data is not an array:', data);
          }
        } catch (error) {
          console.error('Error searching for movies:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    searchMovies();
  }, [query]); 

  return (
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search movies..."
        />
        <button type="submit">Search</button>
      </form>

      {loading ? <div>Loading...</div> : <MovieList movies={movies} />}
    </div>
  );
};

export default MoviesPage;
