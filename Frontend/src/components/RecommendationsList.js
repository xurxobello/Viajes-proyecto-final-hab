import { NavLink } from "react-router-dom";
import Recommendation from "./Recommendation";

function RecommendationsList({ recommendations }) {
  return recommendations.length ? (
    <ul>
      {recommendations.map((recommendation) => {
        return (
          <li key={recommendation.id}>
            <NavLink to={`/api/recommendations/${recommendation.id}`}>
              <Recommendation recommendation={recommendation} />
            </NavLink>
          </li>
        );
      })}
    </ul>
  ) : (
    <p>Todavía no hay recomendaciones...</p>
  );
}
export default RecommendationsList;
