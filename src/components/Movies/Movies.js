import './Movies.css';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SearchForm from '../SearchForm/SearchForm';
import React from 'react';
import { useState, useEffect } from 'react';
import Preloader from '../Preloader/Preloader';


const Movies = ({ movies, savedMovies, onLikeMovie, apiErrors }) => {
    const [filteredMovies, setFilteredMovies] = useState([]);
    const searchedMovies = localStorage.getItem('searchedMovies');
    const queries = localStorage.getItem('searchQueryMovies');
    const [searchQuery, setSearchQuery] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    //отобразить фильмы из localstorage если есть история поиска
    useEffect(() => {
        if (searchedMovies) {
            setFilteredMovies(JSON.parse(searchedMovies));
        }
    }, [searchedMovies]);

    useEffect(() => {
        if (queries) {
            setSearchQuery(JSON.parse(queries));
        }
    }, [queries]);

    const filterMovies = (query) => {
        if (!filteredMovies.length) {
            setIsLoading(true);
        }

        // тайм аут для показа прелоадера)))
        setTimeout(
            () => {
                // при сабмите сохранить в ЛС ключевое слово 
                let filtered = [];
                localStorage.setItem('searchQueryMovies', JSON.stringify(query));

                if (query.isShortFilmChecked) {
                    filtered = movies.filter((m) => {
                        return (
                            m.duration <= 40 &&
                            m.nameRU
                                .toLowerCase()
                                .trim()
                                .includes(query.searchText.toLowerCase())
                        );
                    });

                    setFilteredMovies(filtered);
                    localStorage.setItem('searchedMovies', JSON.stringify(filtered));
                } else if (!query.isShortFilmChecked) {
                    filtered = movies.filter((m) => {
                        return m.nameRU
                            .toLowerCase()
                            .trim()
                            .includes(query.searchText.toLowerCase());
                    });

                    setFilteredMovies(filtered);
                    localStorage.setItem('searchedMovies', JSON.stringify(filtered));
                }
                setIsLoading(false);
            },
            filteredMovies.length ? 0 : 300
        );
    };

    //сброс слова в инпуте
    const handleResetInput = () => {
        setFilteredMovies([]);
        setSearchQuery({});
        localStorage.removeItem('searchedMovies');
        localStorage.removeItem('searchQueryMovies');
    };


    return (
        <section className="movies">
            <SearchForm
                onFilter={filterMovies}
                searchQuery={searchQuery}
                onResetInput={handleResetInput}
                apiErrors={apiErrors}
            />
            {isLoading ? (
                <Preloader />
            ) : filteredMovies.length ? (
                <MoviesCardList
                    movies={filteredMovies}
                    savedMovies={savedMovies}
                    onLikeMovie={onLikeMovie}
                />
            ) : (
                searchedMovies && (
                    <p className="movies__not-found">
                        По вашему запросу ничего не найдено
                    </p>
                )
            )}
        </section>

    );
}

export default Movies;