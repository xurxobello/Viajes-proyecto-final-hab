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
  if (loading) return <p>Loading...</p>;

  // indicamos que si hay un error nos devuelva el error
  if (error) return <p>{error}</p>;
  return (
    <main>
      <section className="userData">
        <h2>USER PAGE</h2>
        <p style={style}>Nick: {user.nick}</p>
        <p style={styleLetra}>
          User created: {new Date(user.created_at).toLocaleString()}
        </p>

        <p style={style}>Avatar:</p>
        {user.avatar ? (
          <img
            className="imgRedonda"
            src={`${process.env.REACT_APP_BACKEND}/upload/avatar/${user.id}/${user.avatar}`}
            alt="No hay foto de perfil"
          />
        ) : null}

        <ModifyAvatar />
        <p className="userName" style={styleLetra}>
          Name: {user.name}
        </p>
        <ModifyName />
        <p className="userAboutMe" style={styleLetra}>
          About me: {user.about_me}
        </p>
        <ModifyAboutMe />
      </section>
      <UserRecommendations id={user.id} />
    </main>
  );
}
export default UserPage;
