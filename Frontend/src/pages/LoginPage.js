import { useContext, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginUserService } from "../services";

export const LoginPage = () => {
  const [password, setPassLog] = useState("");
  const [email, setEmailLog] = useState("");
  const [error, setError] = useState("");
  const { login } = useContext(AuthContext); //asi se llama al contexto, desestructuramos el login,se llama al useContext(es asi y punto) y llamamos al objeto global creado en el context
  const navigate = useNavigate();

  const handleLog = async (e) => {
    e.preventDefault();
    /* setError(""); */
    try {
      const data = await loginUserService({ email, password }); //en data esta el token
      login(data); //esto me mete el token en el localStorage
      navigate("/"); //cuando se ejecuta el evento te manda a la pagina pricipal
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <main>
      <section>
        <div id="container">
          <h2 className="tituloFormLogin">&bull; LOGIN &bull;</h2>
          <div className="underline"></div>
          <form className="formLoginPage" onSubmit={handleLog}>
            <div className="email">
              <label htmlFor="email"></label>
              <input
                placeholder="Password"
                type="password"
                id="email_input"
                name="email"
                required
                onChange={(e) => setPassLog(e.target.value)}
              ></input>
            </div>
            <div className="name">
              <label htmlFor="email"></label>
              <input
                placeholder="Email"
                type="email"
                id="password"
                name="password"
                required
                onChange={(e) => setEmailLog(e.target.value)}
              ></input>
            </div>
            <div className="submit">
              <input type="submit" value="Login" id="form_button" />
            </div>
            {error ? <p className="errores">{error}</p> : null}{" "}
            {/* si existe un error,lo muestra,si no no hace nada */}
          </form>
        </div>
        <p>
          <NavLink className="buttonRegister" to="/register">
            Sign up
          </NavLink>
        </p>
      </section>
    </main>
  );
};
export default LoginPage;
