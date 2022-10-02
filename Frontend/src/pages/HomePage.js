import RecommendationsList from "../components/RecommendationsList";
import useRecommendations from "../hooks/useRecommendations";

function HomePage() {
  // Importamos el Hook useRecommendations, que se encarga, entre otras cosas, de hacer una petición al API para obtener las recomendaciones
  const { recommendations, loading, error } = useRecommendations();

  // indicamos que mientras carga nos devuelva un mensaje indicándolo
  if (loading) return <p>Cargando recomendaciones...</p>;

  // indicamos que si hay un error nos devuelva el error
  if (error) return <p>{error}</p>;

  // en caso de que no esté cargando ni de un error indicamos que nos de la lista de recomendaciones llamando al componente RecommendationsList
  return (
    <>
      <section>
        <h2>Descubre el próximo lugar al que viajar</h2>
        <RecommendationsList recommendations={recommendations} />
      </section>
    </>
  );
}
export default HomePage;
