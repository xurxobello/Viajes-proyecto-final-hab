import RecommendationsList from "../components/RecommendationsList";
import useRecommendations from "../hooks/useRecommendations";

function HomePage() {
  const { recommendations, loading, error } = useRecommendations();

  if (loading) return <p>Cargando recomendaciones...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h2>Recomendaciones</h2>
      <RecommendationsList recommendations={recommendations} />
    </section>
  );
}
export default HomePage;
