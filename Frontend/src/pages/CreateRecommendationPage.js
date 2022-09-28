import { useContext } from "react";
import { NavLink } from "react-router-dom";
import CreateRecommendation from "../components/CreateRecommendation";
import { AuthContext } from "../context/AuthContext";

function CreateRecommendationPage() {
  const { user } = useContext(AuthContext);

  // primero comprobamos que el usuario esté logado, en caso de estarlo indicamos que facilite el formulario para crear una nueva recomendación que definimos en el componente CreateRecommendation, y en caso de no estarlo, invitamos al usuario a que se logue dejando un link que lo lleve ya a dicha página
  return (
    <section>
      <h2>NUEVA RECOMENDACION</h2>

      {user ? (
        <CreateRecommendation />
      ) : (
        <p>
          Debes estar logado para poder crear una recomendación, haz click
          <NavLink to="/login"> aquí </NavLink>
          para logarte.
        </p>
      )}
    </section>
  );
}
export default CreateRecommendationPage;