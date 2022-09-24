function Recommendation({ recommendation }) {
  return (
    <article>
      {recommendation.photo ? (
        <img
          // OJO!!!  Debajo no debe ir el número 23, sino el :id del user
          src={`${process.env.REACT_APP_BACKEND}/upload/recommendation/23/${recommendation.photo}`}
          alt={recommendation.intro}
        />
      ) : null}
      <p>Categoría: {recommendation.category}</p>
      <p>Introducción: {recommendation.intro}</p>
    </article>
  );
}
export default Recommendation;
