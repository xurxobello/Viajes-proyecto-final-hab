import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

import {
  commentUserService,
  dislikeService,
  getAllCommentsService,
  getLikesRecommendationService,
  likeService,
} from "../services";

function DetailRecommendation({ recommendation }) {
  const { id } = useParams();

  const [likes, setLikes] = useState([]);

  const [comments, setComments] = useState([]);

  const { user, token } = useContext(AuthContext);

  const [content, setContent] = useState("");

  useEffect(() => {
    const getLikesData = async () => {
      const data = await getLikesRecommendationService({ id });
      try {
        setLikes(data.totalLikes);
      } catch (error) {}
    };
    getLikesData();
  }, []);

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
  }, [likes]);

  const handleLike = async (e) => {
    try {
      const responseStatus = await likeService({ token, id });
      console.log(responseStatus);

      await getLikesRecommendationService({ id });

      if (responseStatus === 200) {
        setLikes(likes + 1);
      }
    } catch (error) {}
  };

  const handleDislike = async (e) => {
    try {
      const responseStatus = await dislikeService({ token, id });
      console.log(responseStatus);
      await getLikesRecommendationService({ id });

      if (responseStatus === 200) {
        setLikes(likes - 1);
      }
    } catch (error) {}
  };

  const handleComment = async (e) => {
    e.preventDefault();

    try {
      const newComment = await commentUserService({ id, content, token });
      e.target.reset();
      console.log(comments);
      setComments([...comments, { ...newComment, nick: user.nick }]);
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
      <p>👍{likes}</p>
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
        <p className="errores">
          Autor: AQUI HAY QUE HACER UNA lLLAMADA AL GET DEL NICK DE LA
          RECOMENDACION
        </p>
        <div>{likes}</div>
        <button onClick={handleLike}>👍</button>

        <button onClick={handleDislike}>👎</button>
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
      <ul>
        {comments.map((comment) => {
          return (
            <li key={comment.id}>
              Creado por:{comment.nick}
              Creado el:
              {new Date(comment.created_at).toLocaleDateString()}
              <br />
              {comment.content}
            </li>
          );
        })}
      </ul>
    </>
  );
}
export default DetailRecommendation;
