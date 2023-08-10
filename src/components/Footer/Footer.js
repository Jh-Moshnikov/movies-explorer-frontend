import './Footer.css';

function Footer() {
    return (
<footer className="footer">
      <div className="footer__container">
        <p className="footer__copyright">Учебный проект Яндекс.Практикум х BeatFilm.</p>
        <div className="footer__box">
          <p className="footer__date">&copy; 2023</p>
          <ul className="footer__links">
            <li><a href="https://practicum.yandex.ru/" className="footer__link" target="_blank" rel="noreferrer">Яндекс.Практикум</a></li>
            <li><a href="https://github.com/parakhina-natalya" className="footer__link" target="_blank" rel="noreferrer">Github</a></li>
          </ul>
        </div>
      </div>
    </footer>
    );
}

export default Footer;