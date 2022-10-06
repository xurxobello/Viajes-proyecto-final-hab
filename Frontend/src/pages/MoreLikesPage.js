import MoreLikesRecommendationsList from "../components/MoreLikesRecommendationList";
import useMoreLikesRecommendations from "../hooks/useMoreLikesRecommendations";

function MoreLikesPage() {
  // Importamos el Hook useRecommendations, que se encarga, entre otras cosas, de hacer una petición al API para obtener las recomendaciones
  const { recommendations, loading, error } = useMoreLikesRecommendations();

  // indicamos que mientras carga nos devuelva un mensaje indicándolo
  if (loading) return <p>Loading...</p>;

  // indicamos que si hay un error nos devuelva el error
  if (error) return <p>{error}</p>;

  // en caso de que no esté cargando ni de un error indicamos que nos de la lista de recomendaciones llamando al componente RecommendationsList
  return (
    <main>
      <section>
        <h2>RECOMMENDATIONS WITH MORE LIKES</h2>
        <MoreLikesRecommendationsList recommendations={recommendations} />
      </section>
    </main>
  );
}
export default MoreLikesPage;
