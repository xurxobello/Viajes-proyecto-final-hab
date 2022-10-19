import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { sendAvatarService } from "../services";

function ModifyAvatar({ caption }) {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [image, setImage] = useState(caption);
  const { user, token } = useContext(AuthContext);
  const { id } = useParams();

  const style = {
    fontSize: "25px",
    marginTop: "20px",
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
      await sendAvatarService({ data, token });
    } catch (error) {
      // en caso de que haya un error indicamos que nos facilite dicho error
      setError(error.message);
    } finally {
      // cuando acabe, sea porque todo va bien o haya un error indicamos que el estado de envío pase a false y la página se actualice
      setSending(false);
      window.location.reload();
    }
  };

  return user && user.id === +id ? (
    <>
      <p style={style}>Avatar:</p>
      {user.avatar ? (
        <img
          className="imgRedonda"
          src={`${process.env.REACT_APP_BACKEND}/upload/avatar/${user.id}/${user.avatar}`}
          alt="No hay foto de perfil"
        />
      ) : null}
      <form className="formModifyAvatar" onSubmit={handleForm}>
        <label htmlFor="image">Change your avatar: </label>
        <input
          type="file"
          id="image"
          name="avatar"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          required
        />

        {sending ? <p>ESending form...</p> : null}
        {error ? <p>{error}</p> : null}
        <div className="form_button1">
          <input type="submit" value="Change avatar" id="form_button" />
        </div>
      </form>
    </>
  ) : null;
}

export default ModifyAvatar;
