import { useState } from "react";
import { getSearchService } from "../services";
import search from "../fotos/buscar.png";

function Search() {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [filter, setFilter] = useState("");

  const handleForm = async (e) => {
    // no permitimos que se envíe el formulario de forma normal con e.preventDefault()
    e.preventDefault();

    try {
      // en caso de que todo vaya bien indicamos que el estado de envío pase a true
      setSending(true);

      // definimos la recomendación que esperará al envío del formulario a la base de datos, para lo que necesita data y token
      await getSearchService({ filter });
    } catch (error) {
      // en caso de que haya un error indicamos que nos facilite dicho error
      setError(error.message);
    } finally {
      // cuando acabe, sea porque todo va bien o haya un error indicamos que el estado de envío pase a false
      setSending(false);
    }
  };
  return (
    <form onSubmit={handleForm}>
      <label htmlFor="filter">buscador</label>
      <input type="search" id="filter" name="filter"></input>
      <button className="buscador">
        <img src={search} alt="Buscar" className="iconoBuscador" />
      </button>
      {sending ? <p>Enviando formulario...</p> : null}
      {error ? <p>{error}</p> : null}
    </form>
  );
}
export default Search;
