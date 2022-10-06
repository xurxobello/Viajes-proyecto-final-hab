import { NavLink } from "react-router-dom";
import useUser from "../hooks/useUser";
const stylePerfil = {
  width: "150px",
  height: "150px",
  borderRadius: "100px",
};
const styleColor = {
  color: "black",
};

function DetailUser({ id }) {
  // Importamos el Hook, que se encarga, entre otras cosas, de hacer una petición al API para obtener las información
  const { user, loading, error } = useUser(id);

  // indicamos que mientras carga nos devuelva un mensaje indicándolo
  if (loading) return <p>Loading...</p>;

  // indicamos que si hay un error nos devuelva el error
  if (error) return <p>{error}</p>;
  return (
    <aside>
      <NavLink
        className="detailRecommendation2"
        style={styleColor}
        to={`/user/${user.id}`}
      >
        <h2>About me:</h2>
        <img
          style={stylePerfil}
          src={`${process.env.REACT_APP_BACKEND}/upload/avatar/${user.id}/${user.avatar}`}
          alt="Foto de perfil"
        />
        <p>Nick: {user.nick}</p>
        <p>About me: {user.about_me}</p>
        <p>User since: {new Date(user.created_at).toLocaleString()}</p>
      </NavLink>
    </aside>
  );
}
export default DetailUser;
