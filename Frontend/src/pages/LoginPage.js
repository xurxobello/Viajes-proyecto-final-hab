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
    setError("");
    try {
      const data = await loginUserService({ email, password }); //en data esta el token
      login(data); //esto me mete el token en el localStorage
      navigate("/"); //cuando se ejecuta el evento te manda a la pagina pricipal
    } catch (error) {}
  };
  return (
    <section>
      <h2>LOGIN</h2>

      <form onSubmit={handleLog}>
        <fieldset>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            required
            onChange={(e) => setEmailLog(e.target.value)}
          ></input>
        </fieldset>
        <fieldset>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="password"
            name="password"
            required
            onChange={(e) => setPassLog(e.target.value)}
          ></input>
        </fieldset>
        <button>Accede</button>
        {error ? <p className="errores">{error}</p> : null}{" "}
        {/* si existe un error,lo muestra,si no no hace nada */}
      </form>
      <p>
        <NavLink to="/registro">Regístrate</NavLink>
      </p>
    </section>
  );
};
export default LoginPage;
