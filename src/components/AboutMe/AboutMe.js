import './AboutMe.css';
import avatarPhoto from '../../images/avatar.svg';

function AboutMe() {
    return (
        <section className="about-me" id="about-me">
            <h2 className="about-me__title">Студент</h2>
            <hr />
            <div className="about-me__container">
                <div className="about-me__content-box">
                    <h3 className="about-me__name">Евгений</h3>
                    <p className="about-me__description">Фронтенд-разработчик, 36 лет</p>
                    <p className="about-me__history">Я родился и живу в Саратове,
                        закончил факультет экономики СГУ. У меня есть жена и дочь.
                        Я люблю слушать музыку, а ещё увлекаюсь бегом. Недавно начал кодить.
                        С 2015 года работал в компании «СКБ Контур». После того,
                        как прошёл курс по веб-разработке, начал заниматься фриланс-заказами
                        и ушёл с постоянной работы.</p>
                    <a className="about-me__link" href="https://github.com/Jh-Moshnikov" target="_blank" rel="noreferrer">Github</a>
                </div>
                <img className="about-me__photo" src={avatarPhoto} alt="Евгений" />
            </div>
        </section>
    );
}

export default AboutMe;