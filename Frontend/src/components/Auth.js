import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import logo from "../fotos/logout1.png";

function Auth() {
  const { user, logout } = useContext(AuthContext);

  return user ? (
    <section className="userLoged">
      <NavLink className="navToDetailUser" to={`/user/${user.id}`}>
        User: {user.name}
      </NavLink>
      <br></br>
      <button className="logout" onClick={() => logout()}>
        {" "}
        <img
          src={logo}
          alt="Página no encontrada, haz click aquí para volver a la página principal"
        />
      </button>
    </section>
  ) : (
    <section className="userLoged">
      <NavLink to="/login" className="init">
        Login
      </NavLink>
    </section>
  );
}
export default Auth;
