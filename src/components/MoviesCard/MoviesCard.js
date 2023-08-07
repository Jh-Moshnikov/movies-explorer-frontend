import { useState } from 'react';
import { useLocation } from 'react-router-dom';

import './MoviesCard.css';

function MoviesCard(props) {
    const [Like, setLike] = useState(false);
    const toggleClassSave = () => {
        setLike(!Like);
    };

    let location = useLocation();
    const isLikeButton = location.pathname === '/movies';
    const isDeleteButton = location.pathname === '/saved-movies';

    function movieDuration(time) {
        const mins = time % 60;
        const hours = (time - mins) / 60;
        const formatted = hours + 'ч ' + mins + 'м';
        return formatted;
    }

    return (
        <li className="movie">
            <div className="movie__disciption">
                <div className="movie__info-box">
                    <p className="movie__name"> {props.film.nameRU} </p>
                    {isLikeButton && (
                        <button
                            className={`movie__button movie__button-save ${Like && "movie__button-save_active"}`} onClick={toggleClassSave} type="button"
                        ></button>
                    )}

                    {isDeleteButton && (
                        <button className="movie__button movie__button-del" type="button"></button>
                    )}
                </div>
                <span className="movie__duration">{movieDuration(props.film.duration)}</span>
            </div>
            <img className="movie__image" src={props.film.image} alt={props.film.nameRU} />
        </li>
    );
}

export default MoviesCard;

/* {isLikeButton && (
    <button
    className={`movie__button movie__button-save ${Like && "movie__button-save_active"}`}
  ></button>
)}

{isDeleteButton && (
  <button className="movie__button movie__button-del" type="button"></button>
)}  */