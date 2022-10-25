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

function DetailRecommendation({
  recommendation,
  comments,
  setComments,
  nextPage,
  prevPage,
}) {
  const { id } = useParams();
  const [likes, setLikes] = useState([]);
  const { user, token } = useContext(AuthContext);
  const [content, setContent] = useState("");
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [next, setNext] = useState(nextPage);
  const [prev, setPrev] = useState(prevPage);
  const navigate = useNavigate();
  const style = {
    color: "blue",
  };
  const styleBorder = {
    border: "solid 2px #474544",
  };

  useEffect(() => {
    const getLikesData = async () => {
      const data = await getLikesRecommendationService({ id });
      try {
        setLikes(data.totalLikes);
      } catch (error) {}
    };
    getLikesData();
  }, []);

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
      setComments([{ ...newComment, nick: user.nick }, ...comments]);
    } catch (error) {}
  };

  const deleteRecommendation = async () => {
    try {
      await deleteRecommendationService({ id, token });
    } catch (error) {
      setError(error.message);
    }
  };

  const handleForm = async (e, page) => {
    // no permitimos que se envíe el formulario de forma normal con e.preventDefault()
    e.preventDefault();

    try {
      // en caso de que todo vaya bien indicamos que el estado de envío pase a true
      setSending(true);

      // definimos los datos recibidos como data que esperarán la respuesta de la base de datos
      const data = await getAllCommentsService(id, page);
      setComments(data.comments);
      setNext(data.next);
      setPrev(data.prev);
    } catch (error) {
      // en caso de que haya un error indicamos que nos facilite dicho error
      setError(error.message);
    } finally {
      // cuando acabe, sea porque todo va bien o haya un error indicamos que el estado de envío pase a false
      setSending(false);
    }
  };

  // creamos un componente que se va a encargar de mostrar la recomendación con los datos que queremos
  return !user ? (
    <>
      <article className="detailRecommendation2">
        <h2>Title: {recommendation.title}</h2>
        <p>Place: {recommendation.place}</p>
        {recommendation.photo ? (
          <img
            className="imgDetail"
            src={`${process.env.REACT_APP_BACKEND}/upload/recommendation/${recommendation.user_id}/${recommendation.photo}`}
            alt={recommendation.intro}
          />
        ) : null}
        <p className="contentDetail">{recommendation.content}</p>

        <p>
          Created at: {new Date(recommendation.created_at).toLocaleString()}
        </p>
        <p>👍{likes}</p>
      </article>
      <DetailUser id={recommendation.user_id} />
    </>
  ) : (
    <>
      <article className="detailRecommendation2">
        <h2>Title: {recommendation.title}</h2>
        <p>Place: {recommendation.place}</p>
        {recommendation.photo ? (
          <img
            className="imgDetail"
            src={`${process.env.REACT_APP_BACKEND}/upload/recommendation/${recommendation.user_id}/${recommendation.photo}`}
            alt={recommendation.intro}
          />
        ) : null}
        <p className="contentDetail">{recommendation.content}</p>
        <p>
          Created at: {new Date(recommendation.created_at).toLocaleString()}
        </p>

        {/* En el caso de que el id del usuario coincida con el id del usuario que publicó la recomendación hacemos que aparezca un botón para poder eliminar la misma */}
        {user && user.id === recommendation.user_id ? (
          <section>
            <button
              id="form_button1"
              onClick={() => {
                if (window.confirm("Do you want to remove the recommendation?"))
                  deleteRecommendation(recommendation.id);
                // indicamos que si la recomendación se borra navegue a la web principal donde se verá ya publicada dicha recomendación
                if (deleteRecommendation) {
                  navigate(`/user/${user.id}`);
                }
              }}
            >
              Delete recommendation
            </button>
            {error ? <p>{error}</p> : null}
          </section>
        ) : null}
        <div>{likes}</div>
        <button onClick={handleLike}>👍</button>

        <button onClick={handleDislike}>👎</button>
      </article>

      <DetailUser id={recommendation.user_id} />

      <form className="formDetailRecom" onSubmit={handleComment}>
        <fieldset>
          <label htmlFor="content">Comment: </label>
          <textarea
            onChange={(e) => setContent(e.target.value)}
            id="content"
            name="content"
            cols="40"
            rows="3"
          ></textarea>
        </fieldset>
        <div className="submit">
          <input type="submit" value="Comment" id="form_button1" />
        </div>
      </form>
      <div className="divCom">
        <p>COMMENTS</p>
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
        <ul className="container">
          {comments.map((comment) => {
            return (
              <li key={comment.id}>
                <p style={style}>Created by : {comment.nick}</p>
                <p>{comment.content}</p>
                <br />
                <br />
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
export default DetailRecommendation;
