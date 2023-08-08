import './Portfolio.css';
import Arrow from '../../images/arrow.svg';

function Portfolio() {
    return (
        <section className="portfolio">
            <h2 className="portfolio__title">Портфолио</h2>
            <ul className="portfolio__projects">
                <li className="portfolio__project">
                    <a href="https://github.com/Jh-Moshnikov/how-to-learn" className="portfolio__project-link"
                        target="_blank" rel="noreferrer">Статичный сайт
                        <img className="portfolio__icon" src={Arrow} alt="ссылка на проект" />
                    </a>
                </li>
                <li className="portfolio__project">
                    <a href="https://github.com/Jh-Moshnikov/russian-travel" className="portfolio__project-link"
                        target="_blank" rel="noreferrer">Адаптивный сайт
                        <img className="portfolio__icon" src={Arrow} alt="ссылка на проект" />
                    </a>
                </li>
                <li className="portfolio__project">
                    <a href="https://github.com/Jh-Moshnikov/react-mesto-api-full-gha" className="portfolio__project-link"
                        target="_blank" rel="noreferrer">Одностраничное приложение
                        <img className="portfolio__icon" src={Arrow} alt="ссылка на проект" />
                    </a>
                </li>
            </ul>
        </section>
    )
}

export default Portfolio;