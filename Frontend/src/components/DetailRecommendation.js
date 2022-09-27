import { useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function DetailRecommendation({ recommendation }) {
  const { id } = useParams();
  console.log(id);
  const { user } = useContext(AuthContext);
  // creamos un componente que se va a encargar de mostrar la recomendación con los datos que queremos
  const handleComent = () => {};
  return !user ? (
    <article>
      <p>Título: {recommendation.title}</p>
      <p>Lugar: {recommendation.place}</p>
      {recommendation.photo ? (
        <img
          // OJO!!!  Debajo no debe ir el número 23, sino el :id del user
          src={`${process.env.REACT_APP_BACKEND}/upload/recommendation/3/${recommendation.photo}`}
          alt={recommendation.intro}
        />
      ) : null}
      <p>Contenido: {recommendation.content}</p>
      <p>Creado el: {new Date(recommendation.created_at).toLocaleString()}</p>
    </article>
  ) : (
    <>
      <article>
        <p>Título: {recommendation.title}</p>
        <p>Lugar: {recommendation.place}</p>
        {recommendation.photo ? (
          <img
            // OJO!!!  Debajo no debe ir el número 23, sino el :id del user
            src={`${process.env.REACT_APP_BACKEND}/upload/recommendation/3/${recommendation.photo}`}
            alt={recommendation.intro}
          />
        ) : null}
        <p>Contenido: {recommendation.content}</p>
        <p>Creado el: {new Date(recommendation.created_at).toLocaleString()}</p>
      </article>

      <form>
        <fieldset>
          <label htmlFor="content">Comentario: </label>
          <textarea
            type="text"
            id="content"
            name="content"
            cols="40"
            rows="3"
          ></textarea>
        </fieldset>
        <button>enviar</button>
      </form>
    </>
  );
}
export default DetailRecommendation;

//hay qye haces clicl el ahndle te tiene que hacer una peticion fetch y imprimirtelo todo cada vez que se envia un mensaje ,es decir cada vez que clicas
