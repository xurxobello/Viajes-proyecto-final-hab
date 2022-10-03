import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { sendAboutMeService } from "../services";

function ModifyAboutMe() {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [about_me, setAbout_me] = useState("");
  const { user, token } = useContext(AuthContext);
  const { id } = useParams();

  // definimos la manera de gestionar el formulario
  const handleForm = async (e) => {
    // no permitimos que se envíe el formulario de forma normal con e.preventDefault()
    e.preventDefault();

    try {
      // en caso de que todo vaya bien indicamos que el estado de envío pase a true
      setSending(true);

      // definimos la recomendación que esperará al envío del formulario a la base de datos, para lo que necesita data y token
      await sendAboutMeService({ about_me, token });
    } catch (error) {
      // en caso de que haya un error indicamos que nos facilite dicho error
      setError(error.message);
    } finally {
      // cuando acabe, sea porque todo va bien o haya un error indicamos que el estado de envío pase a false
      setSending(false);
      window.location.reload();
    }
  };

  return user && user.id === +id ? (
    <section>
      <form onSubmit={handleForm}>
        <label htmlFor="about_me">Modificar sobre mi: </label>
        <input
          type="text"
          id="about_me"
          name="about_me"
          onChange={(e) => setAbout_me(e.target.value)}
          required
        ></input>
        <button>Enviar</button>
        {sending ? <p>Enviando formulario...</p> : null}
        {error ? <p>{error}</p> : null}
      </form>
    </section>
  ) : null;
}
export default ModifyAboutMe;