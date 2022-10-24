import { useParams } from "react-router-dom";
import DetailRecommendation from "../components/DetailRecommendation";
import useComments from "../hooks/useComments";
import useRecommendation from "../hooks/useRecommendation";

function RecommendationPage() {
  // utilizamos useParams ya que es un Hook que nos permite acceder a los parámetros de la ruta actual por lo que gracias a ello sacamos la id
  const { id } = useParams();

  const { recommendation, loading, error } = useRecommendation(id);
  const { comments, setComments, next, prev, load, err } = useComments(id);

  // indicamos que mientras carga nos devuelva un mensaje indicándolo
  if (loading) return <p>Loading...</p>;
  if (load) return <p>Loading...</p>;

  // indicamos que si hay un error nos devuelva el error
  if (error) return <p>{error.message}</p>;
  if (err) return <p>{error.message}</p>;

  // en caso de que no esté cargando ni de un error indicamos que nos de la recomendación llamando al componente DetailRecommendation
  return (
    <main>
      <section className="detailRecommendation">
        <h2>Recomendation</h2>
        <DetailRecommendation
          recommendation={recommendation}
          comments={comments}
          setComments={setComments}
          nextPage={next}
          prevPage={prev}
        />
      </section>
    </main>
  );
}
export default RecommendationPage;
