import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import { commentUserService, getAllCommentsService } from "../services";

function DetailRecommendation({ recommendation }) {
  const { id } = useParams();
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getAllCommentsService({ id });
        setComments(data.comments);
      } catch (error) {
        console.error(error);
      }
    };
    getUserData();
  }, []);

  console.log(id);
  const { user, token } = useContext(AuthContext);
  const [content, setContent] = useState("");

  const handleComment = async (e) => {
    e.preventDefault();

    try {
      await commentUserService({ id, content, token });
      e.target.reset();
    } catch (error) {}
  };
  // creamos un componente que se va a encargar de mostrar la recomendación con los datos que queremos

  return !user ? (
    <article>
      <p>Título: {recommendation.title}</p>
      <p>Lugar: {recommendation.place}</p>
      {recommendation.photo ? (
        <img
          // OJO!!!  Debajo no debe ir el número 23, sino el :id del user
          src={`${process.env.REACT_APP_BACKEND}/upload/recommendation/${recommendation.user_id}/${recommendation.photo}`}
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
            src={`${process.env.REACT_APP_BACKEND}/upload/recommendation/${recommendation.user_id}/${recommendation.photo}`}
            alt={recommendation.intro}
          />
        ) : null}
        <p>Contenido: {recommendation.content}</p>
        <p>Creado el: {new Date(recommendation.created_at).toLocaleString()}</p>
      </article>

      <form onSubmit={handleComment}>
        <fieldset>
          <label htmlFor="content">Comentario: </label>
          <textarea
            type="text"
            onChange={(e) => setContent(e.target.value)}
            id="content"
            name="content"
            cols="40"
            rows="3"
          ></textarea>
        </fieldset>
        <button>enviar</button>
      </form>
      {/*  <ul>
      {comments.map((comment) => {
        return (
          <li key={com.id}>
            
          </li>
        );
      })}
    </ul> */}
    </>
  );
}
export default DetailRecommendation;

/* ul>
      {recommendations.map((recommendation) => {
        return (
          <li key={recommendation.id}>
            <NavLink to={`/api/recommendations/${recommendation.id}`}>
              <Recommendation recommendation={recommendation} />
            </NavLink>
          </li>
        );
      })}
    </ul>
 */
