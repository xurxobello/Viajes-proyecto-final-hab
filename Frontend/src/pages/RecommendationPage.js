import { useParams } from "react-router-dom";
import DetailRecommendation from "../components/DetailRecommendation";
import useRecommendation from "../hooks/useRecommendation";

function RecommendationPage() {
  const { id } = useParams();

  const { recommendation, loading, error } = useRecommendation(id);

  if (loading) return <p>Cargando recomendación...</p>;
  if (error) return <p>{error}</p>;

  return (
    <section>
      <h2>Recomendación</h2>
      <DetailRecommendation recommendation={recommendation} />
    </section>
  );
}
export default RecommendationPage;
