import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { sendAvatarService } from "../services";

function ModifyAvatar() {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [image, setImage] = useState(null);
  const { user, token } = useContext(AuthContext);
  const navigate = useNavigate();

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
      await sendAvatarService({ data, token });
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
      <label htmlFor="image">Añade un nuevo avatar: </label>
      <input
        type="file"
        id="image"
        name="avatar"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        required
      />
      <button>Enviar avatar</button>
      {sending ? <p>Enviando formulario...</p> : null}
      {error ? <p>{error}</p> : null}
    </form>
  );
}
export default ModifyAvatar;
