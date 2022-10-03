import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserService } from "../services";

function RegisterPage() {
  const navigate = useNavigate(); //el navigate lo que te permite es redireccionar a otra pagina
  const [name, setName] = useState("");
  const [nick, setNickName] = useState("");
  const [email, setEmail] = useState(""); //estado para el email
  const [password, setPass] = useState(""); //estado para la pass
  const [passRepeat, setPassRepeat] = useState(""); //estado para la pass repetica
  const [about_me, setAbout] = useState("null");
  const [error, setError] = useState("");

  const handleForm = async (e) => {
    e.preventDefault();
    setError(""); //este setError lo que hace es que cuando te salta un error se queda siempre ahi no se va,con esto lo que hacemos es que cuando ponemos otra contraseña para corregir resetea el estado del error,es decir a null por lo tanto desaparece.
    if (password !== passRepeat) {
      setError("Las contraseñas deben coincidir");
      return;
    }
    try {
      navigate("/login");
      await registerUserService({ name, email, password, nick, about_me });
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <main>
      <section>
        <h2>Registro</h2>

        <form onSubmit={handleForm}>
          {" "}
          {/* en este handleForm lo que hacemos es decirle : cuando envies el formulario ejecuta esta funcion,y haz lo que dice (linea 8) */}
          <fieldset>
            <label htmlFor="name">Nombre</label>
            <input
              id="name"
              name="name"
              required
              onChange={(e) => setName(e.target.value)} //cuando cambie actualiza el estado con el valor del formulario con target.value
            ></input>
          </fieldset>
          <fieldset>
            <label htmlFor="nick">NICKNAME</label>
            <input
              id="nick"
              name="nick"
              required
              onChange={(e) => setNickName(e.target.value)} //cuando cambie actualiza el estado con el valor del formulario con target.value
            ></input>
          </fieldset>
          <fieldset>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              onChange={(e) => setEmail(e.target.value)} //cuando cambie actualiza el estado con el valor del formulario con target.value
            ></input>
          </fieldset>
          <fieldset>
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              onChange={(e) => setPass(e.target.value)}
            ></input>
          </fieldset>
          <fieldset>
            <label htmlFor="passwordRepeat">Repite la contraseña</label>
            <input
              type="password"
              id="passwordRepeat"
              name="passwordRepeat"
              required
              onChange={(e) => setPassRepeat(e.target.value)}
            ></input>
          </fieldset>
          <fieldset>
            <label htmlFor="about_me">ABOUT ME</label>
            <input
              type="text"
              id="about_me"
              name="about_me"
              onChange={(e) => setAbout(e.target.value)} //cuando cambie actualiza el estado con el valor del formulario con target.value
            ></input>
          </fieldset>
          <button>registrate</button>
          {error ? <p className="errores">{error}</p> : null}{" "}
          {/* si existe un error,lo muestra,si no no hace nada */}
        </form>
      </section>
    </main>
  );
}
export default RegisterPage;
