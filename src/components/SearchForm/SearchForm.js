import './SearchForm.css';
import IconFind from '../../images/IconFind.png';

function SearchForm() {
    return (
        <section className="search" aria-label="Поиск по сайту">
            <form className="search__form">
                <input className="search__input" name="search" placeholder="Фильм" type="search" />
                <button className="search__button" type="submit"><img src={IconFind} alt="Изображение иконки поиска" /></button>
            </form>
            <form className="toggle">
                <label className="toggle__checkbox">
                    <input className="toggle__checkbox-input" type="checkbox" />
                    <span className="toggle__checkbox-switch"></span>
                </label>
                <span className="toggle__text">Короткометражки</span>
            </form>
        </section>
    );
}

export default SearchForm;