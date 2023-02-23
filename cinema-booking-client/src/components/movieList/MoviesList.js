import './moviesList.css';
import MovieInfo from '../movie/MovieInfo';

function MoviesList() {
    return (
        <div className="movie-list">
            <MovieInfo />
            <MovieInfo />
            <MovieInfo />
            <MovieInfo />
            <MovieInfo />

        </div>
    );
}

export default MoviesList;