import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../fotos/logout.png";

function Auth() {
  const { user, logout } = useContext(AuthContext);

  return user ? (
    <section>
      <NavLink to={`/user/${user.id}`}>{user.name}</NavLink>
      <button className="btn from-top" onClick={() => logout()}>
        {" "}
        <img
          className="logout"
          src={logo}
          alt="Página no encontrada, haz click aquí para volver a la página principal"
        />
      </button>
    </section>
  ) : (
    <NavLink to="/login" className="init">
      Iniciar sesión
    </NavLink>
  );
}
export default Auth;
