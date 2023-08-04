import { useState } from 'react';
import './MoviesCard.css';

function MoviesCard(props) {
    const [Save, setSave] = useState(false);
    const toggleClassSave = () => {
        setSave(!Save);
    };

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
                    {!props.save ? (
                        <button className={`movie__button movie__button-save ${Save && "movie__button-save_active"}`}
                            onClick={toggleClassSave} type="button"></button>
                    ) : (
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