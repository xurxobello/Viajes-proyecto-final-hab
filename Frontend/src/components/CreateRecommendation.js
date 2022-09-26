import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { sendRecommendationService } from "../services";

// creamos un componente que se va a encargar de mostrar el formulario para crear una recomendación y gestionará la carga del envío y posibles errores
function CreateRecommendation() {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const { token } = useContext(AuthContext);

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setSending(true);
      // definimos data que va a ser un objeto que contenga los datos del formulario
      const data = new FormData(e.target);
      const recommendation = await sendRecommendationService({ data, token });

      console.log(recommendation);
    } catch (error) {
      setError(error.message);
    } finally {
      setSending(false);
    }
  };

  return (
    <form onSubmit={handleForm}>
      <h2>Crea una nueva recomendación</h2>
      <fieldset>
        <label htmlFor="title">Título</label>
        <input type="text" id="title" name="title" required />
      </fieldset>
      <fieldset>
        <label htmlFor="category">Categoría</label>
        <input type="text" id="category" name="category" required />
      </fieldset>
      <fieldset>
        <label htmlFor="place">Lugar</label>
        <input type="text" id="place" name="place" required />
      </fieldset>
      <fieldset>
        <label htmlFor="intro">Introducción</label>
        <input type="text" id="intro" name="intro" required />
      </fieldset>
      <fieldset>
        <label htmlFor="content">Contenido</label>
        <input type="text" id="content" name="content" required />
      </fieldset>
      <fieldset>
        <label htmlFor="photo">Foto</label>
        <input type="text" id="photo" name="photo" required />
      </fieldset>
      <fieldset>
        <label htmlFor="image">Imagen</label>
        <input
          type="file"
          id="image"
          name="caption"
          accept="image/*"
          required
        />
      </fieldset>
      <button>Enviar recomendación</button>
      {sending ? <p>Enviando formulario...</p> : null}
      {error ? <p>{error}</p> : null}
    </form>
  );
}
export default CreateRecommendation;
