import { NavLink } from "react-router-dom";
import Auth from "./Auth";

function Header() {
  return (
    <header>
      <h1>
        <NavLink to="/api/recommendations">Viajes</NavLink>
      </h1>
      <nav>
        <Auth />
      </nav>
    </header>
  );
}
export default Header;
