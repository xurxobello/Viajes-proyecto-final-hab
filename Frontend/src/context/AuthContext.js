import { createContext, useEffect, useState } from "react";

export const AuthContext = createContext(); //objeto global de contexto para llamarlo en otros componentes
export const AuthProviderComponent = ({ children }) => {
  const [token, setToken] = useState(localStorage.getItem("token")); //esto es para que al recargar no se pierda el token

  useEffect(() => {
    localStorage.setItem("token", token); //dentro de token,guardamos el token
  }, [token]); //cada vez que el token se modifica hace lo del useEfect

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      {children}
    </AuthContext.Provider>
  ); //lo que metemos en el value es lo que vamos a poder usar luego en los otros componentes
};
//explicacion: creamos un contexto ,esta funcion , que no deja de ser una funcion,te dice que lo que haya en el contexto , lo que este dentro va a poder usar todo lo del contexto,por lo tando en el index envolvemos a app para que se pueda usar en todo
