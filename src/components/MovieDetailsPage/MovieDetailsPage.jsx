import { useParams, Link, Outlet, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { fetchMovieDetails } from '../../Services/moviesAPI';
import s from './MovieDetailsPage.module.css';

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const navigate = useNavigate(); 
  const [movie, setMovie] = useState(null);

  useEffect(() => {
    const getMovieDetails = async () => {
      try {
        const data = await fetchMovieDetails(movieId);
        setMovie(data);
      } catch (error) {
        console.error('Error fetching movie details:', error);
      }
    };
    getMovieDetails();
  }, [movieId]);

  if (!movie) return <p>Loading...</p>;

  const bannerUrl = movie.backdrop_path 
    ? `https://image.tmdb.org/t/p/original${movie.backdrop_path}`
    : null;
  
  return (
    <div className={s.details}>
      <button onClick={handleGoBack}>Go back</button>
      {bannerUrl && <img src={bannerUrl} alt={`${movie.title} banner`} className={s.banner} />}
      <h1>
        {movie.title} ({movie.release_date?.slice(0, 4)})
      </h1>
      <p>User Score: {movie.vote_average * 10}%</p>
      <p>Overview: {movie.overview}</p>
      <p>Genres: {movie.genres.map((genre) => genre.name).join(', ')}</p>
      <div>
        <h2>Additional Information</h2>
        <Link to="cast">Cast</Link>
        <Link to="reviews">Reviews</Link>
      </div>
      <Outlet />
    </div>
  );
};

export default MovieDetailsPage;
