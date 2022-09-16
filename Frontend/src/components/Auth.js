import { NavLink } from "react-router-dom";

function Auth() {
  return (
    <button>
      <NavLink to="/api/auth">Iniciar sesión</NavLink>
    </button>
  );
}
export default Auth;
