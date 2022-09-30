import { useEffect, useState } from "react";
import { getUserDataService } from "../services";

// Creamos la función useUser que se va a encargar de tener un estado donde se van a guardar las recomendaciones que lleguen del API para luego exportarlas. Además va a exportar en otro estado información sobre si la petición todavía está cargando o ya acabo de cargar y un último estado que nos indique si la petición tuvo algún error.
function useUser(id) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Utilizamos useEffect para hacer una petición
  useEffect(() => {
    // creamos una función asíncrona
    const loadUser = async () => {
      try {
        // actualizamos el estado para indicar que se están cargando las recomendaciones en el momento de iniciar la función
        setLoading(true);
        const data = await getUserDataService(id);

        setUser(data);
      } catch (error) {
        // si da un error nos devuelve el mensaje del error
        setError(error.message);
      } finally {
        // hacemos un finally para que haya o no haya error la carga pase a ser false
        setLoading(false);
      }
    };
    // ejecutamos la función
    loadUser();
  }, [id]);

  return {
    user,
    loading,
    error,
  };
}
export default useUser;
