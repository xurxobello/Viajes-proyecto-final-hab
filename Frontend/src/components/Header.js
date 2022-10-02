import { NavLink } from "react-router-dom";
import Auth from "./Auth";
import cabecera from "../fotos/generatedtext.png";
import logo from "../fotos/hacklogo.png";
function Header() {
  return (
    <header>
      <h1>
        <NavLink to="/">
          <img
            className="logo"
            src={logo}
            alt="Página no encontrada, haz click aquí para volver a la página principal"
          />
          <img
            className="header"
            src={cabecera}
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
