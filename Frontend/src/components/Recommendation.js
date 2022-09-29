function Recommendation({ recommendation }) {
  // creamos un componente que se va a encargar de mostrar la recomendación con los datos que queremos, en este caso la foto, la categoría y una introducción.
  return (
    <article>
      <p>Introducción: {recommendation.intro}</p>
      <p>Categoría: {recommendation.category}</p>
      {recommendation.photo ? (
        <img
          // OJO!!!  Debajo no debe ir el número 23, sino el :id del user
          src={`${process.env.REACT_APP_BACKEND}/upload/recommendation/${recommendation.user_id}/${recommendation.photo}`}
          alt={recommendation.intro}
        />
      ) : null}
    </article>
  );
}
export default Recommendation;
