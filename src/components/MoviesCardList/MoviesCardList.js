import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard';
import { moviesData } from '../../utils/constants';

function MoviesCardList(props) {
    return (
        <section className="movies-list" aria-label="Киногалерея">
            <ul className="movies-list__films">
                {moviesData.map((film) => (
                    <MoviesCard
                        key={film.movieId}
                        film={film}
                        save={props.save} />
                ))}
            </ul>
            <button className="movies-list__button-more" type="button">Ещё</button>
        </section>
    );
}

export default MoviesCardList;