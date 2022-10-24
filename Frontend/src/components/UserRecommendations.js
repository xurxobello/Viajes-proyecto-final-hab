import useRecommendations from "../hooks/useRecommendations";
import RecommendationsList from "./RecommendationsList";

export const UserRecommendations = ({ id }) => {
  const { recommendations, setRecommendations, next, prev, loading, error } =
    useRecommendations(id);

  // indicamos que mientras carga nos devuelva un mensaje indicándolo
  if (loading) return <p>Loading...</p>;

  // indicamos que si hay un error nos devuelva el error
  if (error) return <p>{error}</p>;

  // en caso de que no esté cargando ni de un error indicamos que nos de la lista de recomendaciones llamando al componente RecommendationsList
  return (
    <>
      <section>
        <RecommendationsList
          recommendations={recommendations}
          setRecommendations={setRecommendations}
          nextPage={next}
          prevPage={prev}
        />
      </section>
    </>
  );
};
