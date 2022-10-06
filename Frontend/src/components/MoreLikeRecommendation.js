import corazon from "../fotos/corazon.svg";
function MoreLikeRecommendation({ recommendation }) {
  const style = {
    fontSize: "20px",
    textTransform: "uppercase",
  };
  // creamos un componente que se va a encargar de mostrar la recomendación con los datos que queremos, en este caso la foto, la categoría y una introducción.
  return (
    <article className="resumeRecommendation">
      <p style={style}>{recommendation.title}</p>
      {recommendation.photo ? (
        <img
          className="imgRecommendation"
          src={`${process.env.REACT_APP_BACKEND}/upload/recommendation/${recommendation.user_id}/${recommendation.photo}`}
          alt={recommendation.intro}
        />
      ) : null}
      <p>Category: {recommendation.category}</p>
      <p>Introduction: {recommendation.intro}</p>
      <p>
        <img id="corazon" src={corazon} alt="corazon" />
        <p>{recommendation.totalLikes}</p>
      </p>
    </article>
  );
}
export default MoreLikeRecommendation;
