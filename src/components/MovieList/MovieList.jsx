import { Link } from 'react-router-dom';

const MovieList = ({ movies }) => {
  if (!Array.isArray(movies)) {
    return <div>Invalid data</div>;
  }

  return (
    <ul>
      {movies.map((movie) => (
        <li key={movie.id}>
          <Link to={`/movies/${movie.id}`}>{movie.title}</Link> 
        </li>
      ))}
    </ul>
  );
};

export default MovieList;
