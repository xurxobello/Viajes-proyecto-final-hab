import { createContext, useEffect, useState } from "react";
import { getMyUserDataService } from "../services";

export const AuthContext = createContext(); //objeto global de contexto para llamarlo en otros componentes

export const AuthProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token")); //esto es para que al recargar no se pierda el token
  const [user, setUser] = useState(null);

  useEffect(() => {
    localStorage.setItem("token", token); //dentro de token(nombre en el localStorage),guardamos el token cada vez que se modifica el token
  }, [token]); //cada vez que el token se modifica hace lo del useEfect

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await getMyUserDataService({ token });
        setUser(data); //seteo setUser con data para meter en  el user todos los detalles de usuario
      } catch (error) {
        logout(); //en el caso de que haya error deslogueamos
      }
    };
    if (token) getUserData();
  }, [token]);

  const login = (token) => {
    setToken(token); //esto de qui lo unico que hice fue en ved de meter en value el settoken ,lo meto en una funcion para exportarlo mas facil.Login es igual a exportar setLogin
  };
  const logout = () => {
    setToken(""); //borra el token
    setUser(null); //borra todos los detalles de usuario
  };

  return (
    <AuthContext.Provider value={{ token, login, logout, user }}>
      {/* aqui ponemos lo que se va a exportar */}
      {children}
    </AuthContext.Provider>
  ); //lo que metemos en el value es lo que vamos a poder usar luego en los otros componentes
};
//explicacion: creamos un contexto ,esta funcion , que no deja de ser una funcion,te dice que lo que haya en el contexto , lo que este dentro va a poder usar todo lo del contexto,por lo tando en el index envolvemos a app para que se pueda usar en todo
