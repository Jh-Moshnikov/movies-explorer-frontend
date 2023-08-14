import React, { useEffect, useState } from 'react';
import './SearchForm.css';
import IconFind from '../../images/IconFind.svg';

const SearchForm = ({ onFilter, searchQuery, onResetInput, apiErrors }) => {
    const [searchText, setSearchText] = useState('');
    const [error, setError] = useState('');
    const isChecked = JSON.parse(localStorage.getItem('filterCheckBox'));
    const [isShortFilmChecked, setIsShortFilmChecked] = useState(isChecked);

    useEffect(() => {
        if (searchQuery.searchText) {
            setSearchText(searchQuery.searchText);
        }
    }, [searchQuery.searchText]);

    const handleChange = (e) => {
        setSearchText(e.target.value);
    };

    const checkFilterBox = () => {
        if (searchText !== '') {
            setIsShortFilmChecked(!isShortFilmChecked);

            onFilter({
                searchText: searchText,
                isShortFilmChecked: !isShortFilmChecked
            });
        } else {
            setIsShortFilmChecked(!isShortFilmChecked);

            onFilter({
                searchText: searchQuery.searchText,
                isShortFilmChecked: !isShortFilmChecked
            });
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!searchText) {
            setError('Нужно ввести ключевое слово');
            return;
        } else {
            onFilter({ searchText, isShortFilmChecked });
        }
    };




/*
  isChecked={searchQuery.isShortFilmChecked}
          onCheck={checkFilterBox}
*/



    return (
        <section className="search" aria-label="Поиск по сайту">
            <form className="search__form" onSubmit={handleSubmit}>
                <input className="search__input" name="search" placeholder="Фильм" value={searchText || ''} min="1"
                    onChange={handleChange} />
                <button className="search__button" type="submit"><img src={IconFind} alt="Изображение иконки поиска" /></button>
            </form>
            <form className="toggle">
                <label className="toggle__checkbox">
                    <input className="toggle__checkbox-input" type="checkbox" id="switch"
                        onChange={checkFilterBox}
                        checked={searchQuery.isShortFilmChecked} />
                    <span className="toggle__checkbox-switch"></span>
                </label>
                <span className="toggle__text">Короткометражки</span>
            </form>
        </section>
    );
}

export default SearchForm;