import { useContext } from "react";
import { NavLink } from "react-router-dom";
import CreateRecommendation from "../components/CreateRecommendation";
import { AuthContext } from "../context/AuthContext";

function CreateRecommendationPage() {
  const { user } = useContext(AuthContext);
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
