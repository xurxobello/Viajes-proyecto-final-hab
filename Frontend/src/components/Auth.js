import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Auth() {
  const { user, logout } = useContext(AuthContext);
  return user ? (
    <p>
      usuario conectado como {user.name}
      <button onClick={() => logout()}> LOGOUT</button>
    </p>
  ) : (
    <NavLink to="/login">Iniciar sesión</NavLink>
  );
}
export default Auth;
