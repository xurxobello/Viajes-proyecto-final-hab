import { useState } from "react";
import { NavLink } from "react-router-dom";
import { getAllRecommendationsService } from "../services";
import Recommendation from "./Recommendation";

// creamos el componente RecommendationsList que recibe una prop con las recomendaciones
function RecommendationsList({ recommendations }) {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState("date");

  const handleForm = async (e) => {
    // no permitimos que se envíe el formulario de forma normal con e.preventDefault()
    e.preventDefault();

    try {
      // en caso de que todo vaya bien indicamos que el estado de envío pase a true
      setSending(true);
      // definimos data que va a ser un objeto que contenga los datos del formulario ya que vamos a recibir un archivo, y la referencia al formulario es e.target

      // definimos la recomendación que esperará al envío del formulario a la base de datos, para lo que necesita data y token
      const recommendation = await getAllRecommendationsService(filter, order);
      console.log(recommendation);
      // indicamos que si la recomendación se crea correctamente navegue a la web principal donde se verá ya publicada dicha recomendación
      /* if (recommendation) {
        navigate("/");
      } */
    } catch (error) {
      // en caso de que haya un error indicamos que nos facilite dicho error
      setError(error.message);
    } finally {
      // cuando acabe, sea porque todo va bien o haya un error indicamos que el estado de envío pase a false
      setSending(false);
    }
  };
  // realizamos un ternario indicando que si hay recomendaciones las recorra haciendo un map y nos las facilite dentro de una lista y en caso de que no haya ninguna nos devuelva un mensaje indicándolo. Hacemos que cada li tenga una key única que sea la id de la recomendación y creamos un link que al hacer click en el lí nos lleve al detalle de esa recomendación en concreto
  return recommendations.length ? (
    <>
      <form onSubmit={handleForm}>
        <label htmlFor="filter">filtro</label>
        <input
          type="text"
          id="filter"
          name="filter"
          onChange={(e) => setFilter(e.target.value)}
        />
        <label htmlFor="order">order</label>
        <select
          id="order"
          name="order"
          onChange={(e) => setOrder(e.target.value)}
        >
          <option value="date" defaultValue>
            fecha
          </option>
          <option value="votes"> votos</option>
        </select>
        <button>enviar</button>
      </form>
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
