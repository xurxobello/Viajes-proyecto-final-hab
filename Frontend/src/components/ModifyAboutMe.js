import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getMyUserDataService, sendAboutMeService } from "../services";

function ModifyAboutMe({ aboutMe }) {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [about_me, setAbout_me] = useState(aboutMe);
  const { user, token } = useContext(AuthContext);
  const { id } = useParams();
  const style = {
    border: "solid",
  };
  const styleLetra = {
    fontSize: "25px",
  };

  // definimos la manera de gestionar el formulario
  const handleForm = async (e) => {
    // no permitimos que se envíe el formulario de forma normal con e.preventDefault()
    e.preventDefault();

    try {
      // en caso de que todo vaya bien indicamos que el estado de envío pase a true
      setSending(true);

      // definimos la recomendación que esperará al envío del formulario a la base de datos, para lo que necesita data y token
      await sendAboutMeService({ about_me, token });
      const data = await getMyUserDataService({ token });
      setAbout_me(data.about_me);
      e.target.reset();
    } catch (error) {
      // en caso de que haya un error indicamos que nos facilite dicho error
      setError(error.message);
    } finally {
      // cuando acabe, sea porque todo va bien o haya un error indicamos que el estado de envío pase a false
      setSending(false);
      /* window.location.reload(); */
    }
  };

  return user && user.id === +id ? (
    <section>
      <p className="userAboutMe" style={styleLetra}>
        About me: {about_me}
      </p>
      <form className="formModifyAboutMe" onSubmit={handleForm}>
        <label htmlFor="about_me">Change about me: </label>
        <input
          placeholder=" Change about you"
          style={style}
          type="text"
          id="about_me"
          name="about_me"
          onChange={(e) => setAbout_me(e.target.value)}
          required
        ></input>
        <div className="submit">
          <input type="submit" value="Change about you" id="form_button" />
        </div>
        {sending ? <p>Enviando formulario...</p> : null}
        {error ? <p>{error}</p> : null}
      </form>
    </section>
  ) : null;
}
export default ModifyAboutMe;
