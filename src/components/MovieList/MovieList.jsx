import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styles from './MovieList.module.css';
export default function MovieList({ movies }) {
    return (
        <ul className={styles.list}>
            {movies.map(({ id, title }) => (
                <li key={id}>
                    <Link to={`/movies/${id}`}>{title}</Link>
                </li>
            ))}
        </ul>
    );
}

MovieList.propTypes = {
    movies: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            title: PropTypes.string.isRequired,
        })
    ).isRequired,
};
