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
  const style = {
    marginTop: "2rem",
  };

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
    <div className="container">
      <form id="container" onSubmit={handleForm}>
        <div>
          <label htmlFor="title">Title: </label>
          <input
            type="text"
            id="title"
            name="title"
            required
            placeholder="Title"
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select name="category" id="category" required>
            <option value="" hidden>
              Select...
            </option>
            <option value="Sun and beach tourism">Sun and beach tourism</option>
            <option value="Rural tourism">Rural tourism</option>
            <option value="Gastronomic tourism">Gastronomic tourism</option>
            <option value="Nature tourism">Nature tourism</option>
            <option value="Cultural tourism">Cultural tourism</option>
            <option value="Others">Others</option>
          </select>
        </div>
        <div>
          <label htmlFor="place">Place: </label>
          <input
            id="place"
            name="place"
            required
            placeholder="Place"
            type="text"
          />
        </div>
        <div>
          <label htmlFor="intro">Introduction: </label>
          <input
            type="text"
            id="intro"
            name="intro"
            placeholder="Introduction"
            required
          />
        </div>
        <div>
          <label htmlFor="content">Contain: </label>
          <textarea
            placeholder="Contain"
            id="content"
            name="content"
            cols="80"
            rows="20"
          ></textarea>
        </div>
        <div>
          <label htmlFor="photo">Photo: </label>
          <input
            type="text"
            id="photo"
            name="photo"
            placeholder="Name your image"
            required
          />
        </div>
        <div>
          <label htmlFor="image">Image: </label>
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
        </div>

        {sending ? <p>Sending form...</p> : null}
        {error ? <p>{error}</p> : null}
        <div style={style} className="submit">
          <input type="submit" value="New recommendation" id="form_button1" />
        </div>
      </form>
    </div>
  );
}
export default CreateRecommendation;
