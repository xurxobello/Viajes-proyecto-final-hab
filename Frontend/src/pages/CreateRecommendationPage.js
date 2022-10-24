import { useContext } from "react";
import { NavLink } from "react-router-dom";
import CreateRecommendation from "../components/CreateRecommendation";
import { AuthContext } from "../context/AuthContext";

function CreateRecommendationPage() {
  const { user } = useContext(AuthContext);
  const style = {
    fontSize: "20px",
    marginTop: "20px",
  };

  // primero comprobamos que el usuario esté logado, en caso de estarlo indicamos que facilite el formulario para crear una nueva recomendación que definimos en el componente CreateRecommendation, y en caso de no estarlo, invitamos al usuario a que se logue dejando un link que lo lleve ya a dicha página
  return (
    <main id="mainCreate">
      <section>
        <h2>NEW RECOMMENDATION</h2>

        {user ? (
          <CreateRecommendation />
        ) : (
          <p style={style}>
            You must be logged in to create a recommendation, click
            <NavLink to="/login" className={"hiper"}>
              {" "}
              here{" "}
            </NavLink>
            to login.
          </p>
        )}
      </section>
    </main>
  );
}
export default CreateRecommendationPage;
