import { NavLink } from "react-router-dom";
import Auth from "./Auth";

function Header() {
  return (
    <header>
      <h1>
        <NavLink to="/">Home aqui ira una imagen</NavLink>
      </h1>
      <nav>
        <Auth />
      </nav>
    </header>
  );
}
export default Header;
