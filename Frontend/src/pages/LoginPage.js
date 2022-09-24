import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { loginUserService } from "../services";

export const LoginPage = () => {
  const [password, setPassLog] = useState("");
  const [email, setEmailLog] = useState("");
  const [error, setError] = useState("");
  const { setToken } = useContext(AuthContext); //asi se llama al contexto, desestructuramos el setToken,se llama al useContext(es asi y punto) y llamamos al objeto global creado en el context
  const handleLog = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const data = await loginUserService({ email, password });
      setToken(data);
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
            id="emailLog"
            name="email"
            required
            onChange={(e) => setEmailLog(e.target.value)}
          ></input>
        </fieldset>
        <fieldset>
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            id="passwordLog"
            name="password"
            required
            onChange={(e) => setPassLog(e.target.value)}
          ></input>
        </fieldset>
        <button>LOGEATE</button>
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
