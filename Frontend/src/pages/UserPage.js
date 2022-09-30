import { useContext } from "react";
import UserRecommendationsList from "../components/UserRecommendationsList";
import { AuthContext } from "../context/AuthContext";
import useUserRecommendations from "../hooks/useUserRecommendations";

function UserPage() {
  const { user } = useContext(AuthContext);
  // Importamos el Hook useUserRecommendations, que se encarga, entre otras cosas, de hacer una petición al API para obtener las recomendaciones
  const { recommendations, loading, error } = useUserRecommendations(user.id);

  // indicamos que mientras carga nos devuelva un mensaje indicándolo
  if (loading) return <p>Cargando recomendaciones...</p>;

  // indicamos que si hay un error nos devuelva el error
  if (error) return <p>{error}</p>;

  // en caso de que no esté cargando ni de un error indicamos que nos de la lista de recomendaciones llamando al componente RecommendationsList

  return (
    <section>
      <h2>Pperfil</h2>
      <UserRecommendationsList recommendations={recommendations} />
    </section>
  );
}
export default UserPage;
