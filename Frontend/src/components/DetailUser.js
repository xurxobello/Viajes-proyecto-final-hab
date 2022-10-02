import { NavLink } from "react-router-dom";
import useUser from "../hooks/useUser";

function DetailUser({ id }) {
  // Importamos el Hook, que se encarga, entre otras cosas, de hacer una petición al API para obtener las información
  const { user, loading, error } = useUser(id);

  // indicamos que mientras carga nos devuelva un mensaje indicándolo
  if (loading) return <p>Cargando datos de usuario...</p>;

  // indicamos que si hay un error nos devuelva el error
  if (error) return <p>{error}</p>;
  return (
    <aside>
      <NavLink to={`/user/${user.id}`}>
        <h2>Sobre mi:</h2>
        <p>
          Avatar:{" "}
          {user.avatar ? (
            <img
              src={`${process.env.REACT_APP_BACKEND}/upload/avatar/${user.id}/${user.avatar}`}
              alt="Foto de perfil"
            />
          ) : null}
        </p>
        <p>Apodo: {user.nick}</p>
        <p>Sobre mi: {user.about_me}</p>
        <p>Usuario desde: {new Date(user.created_at).toLocaleString()}</p>
      </NavLink>
    </aside>
  );
}
export default DetailUser;
