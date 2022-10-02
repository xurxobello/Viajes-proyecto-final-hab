import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navigation() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <nav className="navegador">
        <Link className="letraNav" to="/">
          Home
        </Link>

        <Link className="letraNav" to="/newRecommendation">
          New recommendation
        </Link>

        <Link className="letraNav" to="/moreLikes">
          TOP 10
        </Link>

        <Link className="letraNav" to="/aboutUs">
          About us
        </Link>
      </nav>
      <Outlet />
    </>
  );
}

export default Navigation;
