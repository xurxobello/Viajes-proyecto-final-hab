import { NavLink } from "react-router-dom";

function NotFoundPage() {
  return (
    <section>
      <h2>Página no encontrada</h2>
      <NavLink to="/">
        <img
          src="https://static.doofinder.com/main-files/uploads/2019/08/110655-404-not-found-Doofinder.jpg"
          alt="Página no encontrada, haz click aquí para volver a la página principal"
        />
      </NavLink>
    </section>
  );
}
export default NotFoundPage;
