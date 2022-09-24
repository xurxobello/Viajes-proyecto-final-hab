import { NavLink } from "react-router-dom";

function Auth() {
  return (
    <button>
      <NavLink to="/login">Iniciar sesión</NavLink>
    </button>
  );
}
export default Auth;
