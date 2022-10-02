import { NavLink } from "react-router-dom";
import Auth from "./Auth";
import logo from "../fotos/generatedtext.png";

function Header() {
  return (
    <header>
      <h1>
        <NavLink to="/">
          <img
            className="header"
            src={logo}
            alt="Página no encontrada, haz click aquí para volver a la página principal"
          />
        </NavLink>
      </h1>
      <nav>
        <Auth />
      </nav>
    </header>
  );
}
export default Header;
