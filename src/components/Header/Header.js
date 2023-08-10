import './Header.css';
import Navigation from '../Navigation/Navigation';
import Logo from '../../images/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import Menu from '../Menu/Menu';
import useResize from '../../hooks/useResize.js';

const Header = ({ isLoggedIn }) => {
  let location = useLocation();
  const headerPaths = location.pathname === '/';

  const size = useResize();
  return (
    <header className={`header ${headerPaths && "header_color_blue"}`}>
      <Link className="header__route" to="/">
        <img className="header__logo" src={Logo} alt="Логотип" />
      </Link>

      {size.width > 768 ? (
        <Navigation isLoggedIn={isLoggedIn} />
      ) : isLoggedIn ? (
        <Menu isLoggedIn={isLoggedIn} />
      ) : (
        <Navigation isLoggedIn={isLoggedIn} />
      )}
    </header>
  );
};

export default Header;