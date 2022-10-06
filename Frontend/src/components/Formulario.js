import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUserService } from "../services/index";
import logo from "../fotos/hacklogo.png";
export const Formulario = () => {
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
    <>
      <div id="container">
        <h2 className=" titleFormRegister">&bull; REGISTRATION &bull;</h2>
        <div className="underline"></div>
        <div className="icon_wrapper">
          <img
            className="icon"
            src={logo}
            alt="Página no encontrada, haz click aquí para volver a la página principal"
          />
        </div>
        <form action="#" id="contact_form" onSubmit={handleForm}>
          <div className="name">
            <label htmlFor="name"></label>
            <input
              type="text"
              placeholder="Your name"
              name="name"
              id="name_input"
              required
              onChange={(e) => setName(e.target.value)}
            ></input>
          </div>
          <div className="email">
            <label htmlFor="nick"></label>
            <input
              type="text"
              placeholder="My nick is"
              name="nick"
              id="nick_input"
              required
              onChange={(e) => setNickName(e.target.value)}
            ></input>
          </div>
          <div>
            <label htmlFor="email"></label>
            <input
              type="email"
              placeholder="Email"
              name="email"
              id="email_input"
              required
              onChange={(e) => setEmail(e.target.value)}
            ></input>
          </div>
          <div className="name">
            <label htmlFor="name"></label>
            <input
              type="password"
              placeholder="Password"
              name="name"
              id="name_input"
              required
              onChange={(e) => setPass(e.target.value)}
            ></input>
          </div>
          <div className="email">
            <label htmlFor="repeatPass"></label>
            <input
              type="password"
              placeholder="Repeat password"
              name="repeatPass"
              id="repeat_passinput"
              required
              onChange={(e) => setPassRepeat(e.target.value)}
            ></input>
          </div>
          <div className="message">
            <label htmlFor="message"></label>
            <textarea
              name="message"
              placeholder="About me"
              id="message_input"
              cols="30"
              rows="5"
              required
              onChange={(e) => setAbout(e.target.value)}
            ></textarea>
          </div>
          <div className="submit">
            <input type="submit" value="Register" id="form_button" />
          </div>
        </form>
      </div>
    </>
  );
};
