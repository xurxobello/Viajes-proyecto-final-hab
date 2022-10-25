import corazon from "../fotos/corazon.svg";
function MoreLikeRecommendation({ recommendation }) {
  // creamos un componente que se va a encargar de mostrar la recomendación con los datos que queremos, en este caso la foto, la categoría y una introducción.
  return (
    <article className="resumeRecommendation">
      <h2 id="titleRecom">{recommendation.title}</h2>
      {recommendation.photo ? (
        <img
          className="imgRecommendation"
          src={`${process.env.REACT_APP_BACKEND}/upload/recommendation/${recommendation.user_id}/${recommendation.photo}`}
          alt={recommendation.intro}
        />
      ) : null}
      <p>Category: {recommendation.category}</p>
      <p>Introduction: {recommendation.intro}</p>
      <div>
        <img id="corazon" src={corazon} alt="corazon" />
        <p>{recommendation.totalLikes}</p>
      </div>
    </article>
  );
}
export default MoreLikeRecommendation;
