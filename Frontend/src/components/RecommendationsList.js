import { useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllRecommendationsService } from "../services";
import Recommendation from "./Recommendation";

// creamos el componente RecommendationsList que recibe una prop con las recomendaciones
function RecommendationsList({ recommendations }) {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);

  const style = {
    border: "solid",
    borderRadius: "10px",
    marginTop: "0.1rem",
  };
  // realizamos un ternario indicando que si hay recomendaciones las recorra haciendo un map y nos las facilite dentro de una lista y en caso de que no haya ninguna nos devuelva un mensaje indicándolo. Hacemos que cada li tenga una key única que sea la id de la recomendación y creamos un link que al hacer click en el lí nos lleve al detalle de esa recomendación en concreto
  return recommendations.length ? (
    <>
      <ul className="recommendationsList">
        {recommendations.map((recommendation) => {
          return (
            <li key={recommendation.id}>
              <NavLink to={`/recommendations/${recommendation.id}`}>
                <Recommendation recommendation={recommendation} />
              </NavLink>
            </li>
          );
        })}
      </ul>
      {sending ? <p>Enviando formulario...</p> : null}
      {error ? <p>{error}</p> : null}
    </>
  ) : (
    <p>Todavía no hay recomendaciones...</p>
  );
}
export default RecommendationsList;
