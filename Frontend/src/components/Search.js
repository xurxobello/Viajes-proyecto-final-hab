import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllRecommendationsService, getSearchService } from "../services";
import RecommendationsList from "./RecommendationsList";

function Search() {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [filter, setFilter] = useState("");
  const [order, setOrder] = useState("date");
  const navigate = useNavigate();
  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setSending(true);

      const recommendations = await getAllRecommendationsService(filter, order);
      console.log(recommendations);

      navigate("/recommendations/filter");
    } catch (error) {
      setError(error.message);
    } finally {
      setSending(false);
    }
  };
  const style = {
    border: "solid",
    borderRadius: "10px",
    marginTop: "0.1rem",
  };
  const stylePading = {
    paddingRight: "100px",
  };

  return (
    <div>
      <h2 className="tituloFormLogin">&bull; BUSCADOR &bull;</h2>
      <div className="underline"></div>

      <form onSubmit={handleForm}>
        <div className="name">
          <label htmlFor="filter"></label>
          <input
            placeholder="    Search your recommendation"
            style={style}
            type="text"
            id="email_input"
            name="email"
            required
            onChange={(e) => setFilter(e.target.value)}
          ></input>
        </div>
        <div className="name">
          <label htmlFor="email"></label>
          <label htmlFor="order"></label>
          <select
            placeholder="Filtros"
            style={style}
            id="subject_inpu"
            name="subjec"
            onChange={(e) => setOrder(e.target.value)}
          >
            <option value="date" defaultValue>
              Date
            </option>
            <option value="votes"> Likes</option>
          </select>
        </div>
        <div className="submit">
          <input type="submit" value="Search" id="form_button1" />
        </div>
        {error ? <p className="errores">{error}</p> : null}{" "}
        {/* si existe un error,lo muestra,si no no hace nada */}
      </form>
    </div>
  );
}
export default Search;
