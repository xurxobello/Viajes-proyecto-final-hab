import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { getMyUserDataService, sendNameService } from "../services";

function ModifyName({ Name }) {
  const [error, setError] = useState("");
  const [sending, setSending] = useState(false);
  const [name, setName] = useState(Name);
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
      await sendNameService({ name, token });
      const data = await getMyUserDataService({ token });
      setName(data.name);
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
      <p className="userName" style={styleLetra}>
        Name: {name}
      </p>
      <form className="formModifyName" onSubmit={handleForm}>
        <label htmlFor="name"> </label>
        <input
          placeholder=" Change your name"
          style={style}
          type="text"
          id="name"
          name="name"
          onChange={(e) => setName(e.target.value)}
          required
        ></input>
        <div className="submit">
          <input type="submit" value="Change name" id="form_button" />
        </div>
        {sending ? <p>Enviando formulario...</p> : null}
        {error ? <p>{error}</p> : null}
      </form>
    </section>
  ) : null;
}
export default ModifyName;
