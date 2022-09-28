import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { sendRecommendationService } from "../services";

// creamos un componente que se va a encargar de mostrar el formulario para crear una recomendación y gestionará la carga del envío y posibles errores
function CreateRecommendation() {
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [image, setImage] = useState(null);
  const { token } = useContext(AuthContext);

  // definimos la manera de gestionar el formulario
  const handleForm = async (e) => {
    // no permitimos que se envíe el formulario de forma normal con e.preventDefault()
    e.preventDefault();

    try {
      // en caso de que todo vaya bien indicamos que el estado de envío pase a true
      setSending(true);
      // definimos data que va a ser un objeto que contenga los datos del formulario ya que vamos a recibir un archivo, y la referencia al formulario es e.target
      const data = new FormData(e.target);

      // definimos la recomendación que esperará al envío del formulario a la base de datos, para lo que necesita data y token
      const recommendation = await sendRecommendationService({ data, token });

      // indicamos que si la recomendación se crea correctamente navegue a la web principal donde se verá ya publicada dicha recomendación
      if (recommendation) {
        navigate("/");
      }
    } catch (error) {
      // en caso de que haya un error indicamos que nos facilite dicho error
      setError(error.message);
    } finally {
      // cuando acabe, sea porque todo va bien o haya un error indicamos que el estado de envío pase a false
      setSending(false);
    }
  };

  // creamos el formulario para enviar a CreateRecommendationPage
  // en el campo para la imagen, introducimos accept="image/*" lo que hará que sólo acepte imágenes en dicho campo
  // a continuación del campo para la imagen vamos a hacer una previsualización de la misma en caso de estar cargada, para ello, en el campo de la imagen indicamos que si hay algún cambio (onChange) nos lo muestre y para poder ver dicha imagen debe acceder a e.target.files[0] ya que es la imagen que acabamos de escoger, e.target es la referencia al input, e.target.files es la colección de ficheros que hay metidos en un input de tipo imagen y [0] porque permitimos una única imagen. Volviendo de nuevo al campo de la previsualización, mediante src={URL.createObjectURL(image)} aceptamos un objeto de tipo file y creamos una representación de URL de ello.
  return (
    <form onSubmit={handleForm}>
      <h2>Crea una nueva recomendación</h2>
      <fieldset>
        <label htmlFor="title">Título: </label>
        <input type="text" id="title" name="title" required />
      </fieldset>
      <fieldset>
        <label htmlFor="category">Categoría: </label>
        <select name="category" id="category" required>
          <option value="" hidden>
            Selecciona...
          </option>
          <option value="Paisajes">Paisajes</option>
          <option value="Monumentos">Monumentos</option>
          <option value="Comida">Comida</option>
          <option value="Otros">Otros</option>
        </select>
      </fieldset>
      <fieldset>
        <label htmlFor="place">Lugar: </label>
        <input type="text" id="place" name="place" required />
      </fieldset>
      <fieldset>
        <label htmlFor="intro">Introducción: </label>
        <input
          type="text"
          id="intro"
          name="intro"
          placeholder="haz una breve descripción de la imagen"
          required
        />
      </fieldset>
      <fieldset>
        <label htmlFor="content">Contenido: </label>
        <textarea
          type="text"
          id="content"
          name="content"
          cols="80"
          rows="20"
        ></textarea>
      </fieldset>
      <fieldset>
        <label htmlFor="photo">Foto: </label>
        <input
          type="text"
          id="photo"
          name="photo"
          placeholder="pon nombre a tu imagen"
          required
        />
      </fieldset>
      <fieldset>
        <label htmlFor="image">Imagen: </label>
        <input
          type="file"
          id="image"
          name="caption"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />
        {image ? (
          <figure>
            <img
              src={URL.createObjectURL(image)}
              alt="preview"
              style={{ width: "250px" }}
            />
          </figure>
        ) : null}
      </fieldset>
      <button>Enviar recomendación</button>
      {sending ? <p>Enviando formulario...</p> : null}
      {error ? <p>{error}</p> : null}
    </form>
  );
}
export default CreateRecommendation;