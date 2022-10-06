import { NavLink } from "react-router-dom";

function NotFoundPage() {
  return (
    <main>
      <section>
        <h2>Page not found</h2>
        <NavLink to="/">
          <img
            src="https://static.doofinder.com/main-files/uploads/2019/08/110655-404-not-found-Doofinder.jpg"
            alt="Page not found, click here to return to the main page"
          />
        </NavLink>
      </section>
    </main>
  );
}
export default NotFoundPage;
