import { NavLink } from "react-router-dom";

function NotFoundPage() {
  return (
    <section>
      <h2>Página no encontrada</h2>
      <NavLink to="/api/recommendations">Volver a la página principal</NavLink>
    </section>
  );
}
export default NotFoundPage;
