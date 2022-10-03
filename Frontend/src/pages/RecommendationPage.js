import { useParams } from "react-router-dom";
import DetailRecommendation from "../components/DetailRecommendation";
import useRecommendation from "../hooks/useRecommendation";

function RecommendationPage() {
  // utilizamos useParams ya que es un Hook que nos permite acceder a los parámetros de la ruta actual por lo que gracias a ello sacamos la id
  const { id } = useParams();

  const { recommendation, loading, error } = useRecommendation(id);

  // indicamos que mientras carga nos devuelva un mensaje indicándolo
  if (loading) return <p>Cargando recomendación...</p>;

  // indicamos que si hay un error nos devuelva el error
  if (error) return <p>{error}</p>;

  // en caso de que no esté cargando ni de un error indicamos que nos de la recomendación llamando al componente DetailRecommendation
  return (
    <main>
      <section>
        <h2>Recomendación</h2>
        <DetailRecommendation recommendation={recommendation} />
      </section>
    </main>
  );
}
export default RecommendationPage;
