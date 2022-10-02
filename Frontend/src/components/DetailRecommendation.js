import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import DetailUser from "./DetailUser";
import {
  commentUserService,
  deleteRecommendationService,
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
  const [error, setError] = useState("");
  const navigate = useNavigate();

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

      await getLikesRecommendationService({ id });

      if (responseStatus === 200) {
        setLikes(likes + 1);
      }
    } catch (error) {}
  };

  const handleDislike = async (e) => {
    try {
      const responseStatus = await dislikeService({ token, id });
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
      setComments([...comments, { ...newComment, nick: user.nick }]);
    } catch (error) {}
  };

  const deleteRecommendation = async () => {
    try {
      await deleteRecommendationService({ id, token });
    } catch (error) {
      setError(error.message);
    }
  };

  // creamos un componente que se va a encargar de mostrar la recomendación con los datos que queremos
  return !user ? (
    <>
      <article>
        <h2>Título: {recommendation.title}</h2>
        <p>Lugar: {recommendation.place}</p>
        {recommendation.photo ? (
          <img
            src={`${process.env.REACT_APP_BACKEND}/upload/recommendation/${recommendation.user_id}/${recommendation.photo}`}
            alt={recommendation.intro}
          />
        ) : null}
        <p>Contenido: {recommendation.content}</p>
        <p>Creado el: {new Date(recommendation.created_at).toLocaleString()}</p>
        <p>👍{likes}</p>
      </article>
      <DetailUser id={recommendation.user_id} />
    </>
  ) : (
    <>
      <article>
        <p>Título: {recommendation.title}</p>
        <p>Lugar: {recommendation.place}</p>
        {recommendation.photo ? (
          <img
            src={`${process.env.REACT_APP_BACKEND}/upload/recommendation/${recommendation.user_id}/${recommendation.photo}`}
            alt={recommendation.intro}
          />
        ) : null}
        <p>Contenido: {recommendation.content}</p>
        <p>Creado el: {new Date(recommendation.created_at).toLocaleString()}</p>

        {/* En el caso de que el id del usuario coincida con el id del usuario que publicó la recomendación hacemos que aparezca un botón para poder eliminar la misma */}
        {user && user.id === recommendation.user_id ? (
          <section>
            <button
              onClick={() => {
                if (window.confirm("¿Quieres eliminar la recomendación?"))
                  deleteRecommendation(recommendation.id);
                // indicamos que si la recomendación se borra navegue a la web principal donde se verá ya publicada dicha recomendación
                if (deleteRecommendation) {
                  navigate(`/user/${user.id}`);
                }
              }}
            >
              Borrar recomendación
            </button>
            {error ? <p>{error}</p> : null}
          </section>
        ) : null}
        <div>{likes}</div>
        <button onClick={handleLike}>👍</button>

        <button onClick={handleDislike}>👎</button>
      </article>

      <DetailUser id={recommendation.user_id} />

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
