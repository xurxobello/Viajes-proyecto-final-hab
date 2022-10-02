import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Auth() {
  const { user, logout } = useContext(AuthContext);

  return user ? (
    <section>
      <NavLink to={`/user/${user.id}`}>{user.name}</NavLink>
      <button className="btn from-top" onClick={() => logout()}>
        {" "}
        LOGOUT
      </button>
    </section>
  ) : (
    <NavLink to="/login">Iniciar sesión</NavLink>
  );
}
export default Auth;
