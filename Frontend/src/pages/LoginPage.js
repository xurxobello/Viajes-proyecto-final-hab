import { NavLink } from "react-router-dom";

function LoginPage() {
  return (
    <section>
      <h2>Iniciar sesión</h2>
      <h3>Aquí irá el formulario de iniciar sesión</h3>
      <p>Aún no estás registrado.</p>
      <p>
        <NavLink to="/api/accounts">Regístrate</NavLink>
      </p>
    </section>
  );
}
export default LoginPage;
