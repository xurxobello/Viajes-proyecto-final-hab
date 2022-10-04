import { useParams } from "react-router-dom";
import ModifyAboutMe from "../components/ModifyAboutMe";
import ModifyAvatar from "../components/ModifyAvatar";
import ModifyName from "../components/ModifyName";
import { UserRecommendations } from "../components/UserRecommendations";
import useUser from "../hooks/useUser";

function UserPage() {
  const style = {
    fontSize: "25px",
    marginTop: "20px",
  };
  const styleLetra = {
    fontSize: "25px",
  };
  const { id } = useParams();

  // Importamos el Hook, que se encarga, entre otras cosas, de hacer una petición al API para obtener las información
  const { user, loading, error } = useUser(id);

  // indicamos que mientras carga nos devuelva un mensaje indicándolo
  if (loading) return <p>Cargando datos de usuario...</p>;

  // indicamos que si hay un error nos devuelva el error
  if (error) return <p>{error}</p>;
  return (
    <main>
      <section>
        <h2>PAGINA DE USUARIO</h2>
        <p style={style}>Nick: {user.nick}</p>

        <p style={style}>Avatar:</p>
        <p>
          {user.avatar ? (
            <img
              className="imgRedonda"
              src={`${process.env.REACT_APP_BACKEND}/upload/avatar/${user.id}/${user.avatar}`}
              alt="No hay foto de perfil"
            />
          ) : null}
        </p>

        <ModifyAvatar />
        <p style={styleLetra}>Name: {user.name}</p>
        <ModifyName />
        <p style={styleLetra}>About me: {user.about_me}</p>
        <ModifyAboutMe />
        <p style={styleLetra}>
          User created: {new Date(user.created_at).toLocaleString()}
        </p>
        <UserRecommendations id={user.id} />
      </section>
    </main>
  );
}
export default UserPage;
