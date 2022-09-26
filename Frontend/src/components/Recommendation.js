function Recommendation({ recommendation }) {
  // creamos un componente que se va a encargar de mostrar la recomendación con los datos que queremos, en este caso la foto, la categoría y una introducción.
  return (
    <article>
      {recommendation.photo ? (
        <img
          // OJO!!!  Debajo no debe ir el número 23, sino el :id del user
          src={`${process.env.REACT_APP_BACKEND}/upload/recommendation/2/${recommendation.photo}`}
          alt={recommendation.intro}
        />
      ) : null}
      <p>Categoría: {recommendation.category}</p>
      <p>Introducción: {recommendation.intro}</p>
    </article>
  );
}
export default Recommendation;
