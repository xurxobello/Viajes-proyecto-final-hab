import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navigation() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <nav className="navegador">
        <Link to="/">Home</Link>

        <Link to="/newRecommendation">New recommendation</Link>

        <Link to="/moreLikes">TOP 10</Link>

        <Link to="/aboutUs">About us</Link>
      </nav>
      <Outlet />
    </>
  );
}

export default Navigation;
