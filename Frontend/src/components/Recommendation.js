function Recommendation({ recommendation }) {
  // creamos un componente que se va a encargar de mostrar la recomendación con los datos que queremos, en este caso la foto, la categoría y una introducción.
  return (
    <article className="resumeRecommendation">
      <h2 id="titleRecom">{recommendation.title}</h2>

      <p>{new Date(recommendation.created_at).toLocaleDateString()}</p>
      {recommendation.photo ? (
        <img
          className="imgRecommendation "
          src={`${process.env.REACT_APP_BACKEND}/upload/recommendation/${recommendation.user_id}/${recommendation.photo}`}
          alt={recommendation.intro}
        />
      ) : null}
      <p>{recommendation.intro}</p>
      <p>READ MORE? ☑️</p>
    </article>
  );
}
export default Recommendation;
