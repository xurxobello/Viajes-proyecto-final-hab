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

  // creamos un componente que se va a encargar de mostrar la recomendación con los datos que queremos
  return !user ? (
    <>
      <article className="detailRecommendation2">
        <h2>Title: {recommendation.title}</h2>
        <p>Place: {recommendation.place}</p>
        {recommendation.photo ? (
          <img
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
        <ul className="container">
          {comments.map((comment) => {
            return (
              <li key={comment.id}>
                <p style={style}>Created by : {comment.nick}</p>
                <p>{comment.content}</p>
                <br />
                <br></br>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}
export default DetailRecommendation;
