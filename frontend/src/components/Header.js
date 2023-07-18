import { Link } from "react-router-dom";
import logo from "../images/logo.svg";

function Header({ mail, route, onClick, title }) {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Место Россия" />
      <nav className="header__status">
        <p className="header__text">{mail}</p>
        <Link
          to={route}
          className="header__link"
          type="button"
          onClick={onClick}
        >
          {title}
        </Link>
      </nav>
    </header>
  );
}

export default Header;
