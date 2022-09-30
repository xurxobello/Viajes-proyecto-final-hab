import { useEffect, useState } from "react";
import { getAllUserRecommendationsService } from "../services"; // este hook te saca del backend las recomendaciones

// Creamos la función useUserRecommendations que se va a encargar de tener un estado donde se van a guardar las recomendaciones que lleguen del API para luego exportarlas. Además va a exportar en otro estado información sobre si la petición todavía está cargando o ya acabo de cargar y un último estado que nos indique si la petición tuvo algún error.
function useUserRecommendations(user) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  console.log(user);

  // Utilizamos useEffect para hacer una petición de las recomendaciones y sólo se ejecuta cuando el componente se cargue
  useEffect(() => {
    // creamos una función asíncrona
    const loadRecommendations = async () => {
      try {
        // actualizamos el estado para indicar que se están cargando las recomendaciones en el momento de iniciar la función
        setLoading(true);

        // recuperamos la información de la solicitud enviada a la base de datos
        const data = await getAllUserRecommendationsService(user);
        console.log(data);
        // si todo va bien nos devuelve las recomendaciones
        setRecommendations(data);
      } catch (error) {
        // si da un error nos devuelve el mensaje del error
        setError(error.message);
      } finally {
        // hacemos un finally para que haya o no haya error la carga pase a ser false
        setLoading(false);
      }
    };
    // ejecutamos la función
    loadRecommendations();
  }, []);

  return {
    recommendations,
    loading,
    error,
  };
}
export default useUserRecommendations;
