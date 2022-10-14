import RecommendationsList from "../components/RecommendationsList";
import useRecommendations from "../hooks/useRecommendations";

function HomePage() {
  // Importamos el Hook useRecommendations, que se encarga, entre otras cosas, de hacer una petición al API para obtener las recomendaciones
  const { recommendations, setRecommendations, next, prev, loading, error } =
    useRecommendations();

  // indicamos que mientras carga nos devuelva un mensaje indicándolo
  if (loading) return <p>Loading...</p>;

  // indicamos que si hay un error nos devuelva el error
  if (error) return <p>{error}</p>;

  // en caso de que no esté cargando ni de un error indicamos que nos de la lista de recomendaciones llamando al componente RecommendationsList
  return (
    <main>
      <section>
        <h2 className="h2HomePage">Discover the next place to travel</h2>
        <RecommendationsList
          recommendations={recommendations}
          setRecommendations={setRecommendations}
          nextPage={next}
          prevPage={prev}
        />
      </section>
    </main>
  );
}
export default HomePage;
