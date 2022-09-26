import { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Navigation() {
  const { user } = useContext(AuthContext);
  return (
    <>
      <nav>
        <Link to="/">Home</Link>
        <br></br>
        <Link to="/newRecommendation">New recommendation</Link>
        <br></br>
        <Link to="/moreLikes">More likes</Link>
        <br></br>
        <Link to="/categories">Categories</Link>
        <br></br>
        <Link to="/aboutUs">About us</Link>
        <br></br>
      </nav>
      <Outlet />
    </>
  );
}

export default Navigation;
