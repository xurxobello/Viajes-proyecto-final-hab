import { useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import {
  getAllRecommendationsService,
  getAllUserRecommendationsService,
} from "../services";
import Recommendation from "./Recommendation";

// creamos el componente RecommendationsList que recibe una prop con las recomendaciones
function RecommendationsList({
  recommendations,
  setRecommendations,
  nextPage,
  prevPage,
}) {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState("date");
  const [next, setNext] = useState(nextPage);
  const [prev, setPrev] = useState(prevPage);
  const { id } = useParams();

  const style = {
    border: "solid",
    borderRadius: "10px",
    marginTop: "0.1rem",
  };
  const styleColor = {
    color: "black",
  };

  const handleForm = async (e, page) => {
    // no permitimos que se envíe el formulario de forma normal con e.preventDefault()
    e.preventDefault();

    try {
      // en caso de que todo vaya bien indicamos que el estado de envío pase a true
      setSending(true);

      // definimos los datos recibidos como data que esperarán la respuesta de la base de datos, y pasamos filter y order por si decide pasar algun tipo de filtro en la búsqueda
      const data = id
        ? await getAllUserRecommendationsService(id, page)
        : await getAllRecommendationsService(filter, order, page);
      setRecommendations(data.recommendations);
      setNext(data.next);
      setPrev(data.prev);
      /* OJO no comentar? */
      /* setFilter("");
      setOrder("date"); */
    } catch (error) {
      // en caso de que haya un error indicamos que nos facilite dicho error
      setError(error.message);
    } finally {
      // cuando acabe, sea porque todo va bien o haya un error indicamos que el estado de envío pase a false
      setSending(false);
      /* e.target.reset(); */
    }
  };
  // realizamos un ternario indicando que si hay recomendaciones las recorra haciendo un map y nos las facilite dentro de una lista y en caso de que no haya ninguna nos devuelva un mensaje indicándolo. Hacemos que cada li tenga una key única que sea la id de la recomendación y creamos un link que al hacer click en el lí nos lleve al detalle de esa recomendación en concreto
  return recommendations.length ? (
    <>
      {!id ? (
        <>
          <h2 className="tituloFormLogin">&bull; SEARCH &bull;</h2>
          <div className="underline"></div>
          <form className="search" onSubmit={handleForm}>
            <div className="name">
              <label htmlFor="filter"></label>
              <input
                placeholder="Search"
                style={style}
                type="text"
                id="filter"
                name="filter"
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <div className="name">
              <label htmlFor="order"></label>
              <select
                placeholder="Filtros"
                style={style}
                id="order"
                name="order"
                onChange={(e) => setOrder(e.target.value)}
                required
              >
                <option value="date" defaultValue>
                  Date
                </option>
                <option value="votes"> Likes</option>
              </select>
            </div>
            <div className="submit">
              <input type="submit" value="Search" id="form_button1" />
            </div>
            {error ? <p className="errores">{error}</p> : null}{" "}
          </form>
        </>
      ) : null}
      <h3 className="h3HomePage">Recommendations</h3>
      <div className="buttonpage">
        <button
          className="pagination"
          onClick={(e) => handleForm(e, prev)}
          disabled={!prev ?? true}
        >
          Prev
        </button>
        <button
          className="pagination"
          onClick={(e) => handleForm(e, next)}
          disabled={!next ?? true}
        >
          Next
        </button>
      </div>

      <ul className="recommendationsList">
        {recommendations.map((recommendation) => {
          return (
            <li key={recommendation.id}>
              <NavLink
                style={styleColor}
                to={`/recommendations/${recommendation.id}`}
              >
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
    <>
      {!id ? (
        <>
          <h2 className="tituloFormLogin">&bull; SEARCH &bull;</h2>
          <div className="underline"></div>
          <form className="search" onSubmit={handleForm}>
            <div className="name">
              <label htmlFor="filter"></label>
              <input
                placeholder="Search"
                style={style}
                type="text"
                id="filter"
                name="filter"
                onChange={(e) => setFilter(e.target.value)}
              />
            </div>
            <div className="name">
              <label htmlFor="order"></label>
              <select
                placeholder="Filtros"
                style={style}
                id="order"
                name="order"
                onChange={(e) => setOrder(e.target.value)}
                required
              >
                <option value="date" defaultValue>
                  Date
                </option>
                <option value="votes"> Likes</option>
              </select>
            </div>
            <div className="submit">
              <input type="submit" value="Search" id="form_button1" />
            </div>
            {error ? <p className="errores">{error}</p> : null}{" "}
          </form>
        </>
      ) : null}
      <h3 className="h3HomePage">Recommendations</h3>

      <ul className="recommendationsList">
        {recommendations.map((recommendation) => {
          return (
            <li key={recommendation.id}>
              <NavLink
                style={styleColor}
                to={`/recommendations/${recommendation.id}`}
              >
                <Recommendation recommendation={recommendation} />
              </NavLink>
            </li>
          );
        })}
      </ul>
      {sending ? <p>Enviando formulario...</p> : null}
      {error ? <p>{error}</p> : null}
      <p className="noRecom">No recommendations yet... Try new search</p>
    </>
  );
}
export default RecommendationsList;
