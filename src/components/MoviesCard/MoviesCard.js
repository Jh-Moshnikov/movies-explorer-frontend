import { useLocation } from 'react-router-dom';
import './MoviesCard.css';
/*const BEATFILM_URL = 'https://api.nomoreparties.co';*/
import { BEATFILM_URL } from '../../utils/constants';


const MoviesCard = ({ movie, savedMovies, onLikeMovie, onDeleteMovie }) => {
    let location = useLocation();

    function movieDuration(time) {
        const mins = time % 60;
        const hours = (time - mins) / 60;
        const formatted = hours + 'ч ' + mins + 'м';
        return formatted;
    }

    const isLikeButton = location.pathname === '/movies';
    const savedMovie = savedMovies
        ? savedMovies.find((item) => item.movieId === movie.id)
        : '';
    const isDeleteButton = location.pathname === '/saved-movies';
    const imageUrl = movie.image.url
        ? `${BEATFILM_URL}${movie.image.url}`
        : movie.image;
    const isLiked = savedMovies
        ? savedMovies.some((i) => i.movieId === movie.id)
        : false;


    return (
        <li className="movie">
            <div className="movie__disciption">
                <div className="movie__info-box">
                    <p className="movie__name"> {movie.nameRU} </p>
                    {isLikeButton && (
                        <button
                            onClick={() => onLikeMovie(movie, isLiked, savedMovie?._id)}
                            className={`movie__button movie__button-save ${isLiked ? ' movie__button-save_active' : ''
                                }`}
                        ></button>
                    )}

                    {isDeleteButton && (
                        <button
                            onClick={() => onDeleteMovie(movie._id)}
                            className={`movie__button movie__button-del`}
                        ></button>
                    )}
                </div>
                <span className="movie__duration">{movieDuration(movie.duration)}</span>
            </div>
            <a className="movie__link" href={movie.trailerLink} target="_blank" rel="noreferrer">
                <img className="movie__image" src={imageUrl} alt={movie.nameRU} />
            </a>
        </li>
    );
}

export default MoviesCard;
