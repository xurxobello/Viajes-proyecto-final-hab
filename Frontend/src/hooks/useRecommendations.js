import { useEffect, useState } from "react";
import {
  getAllRecommendationsService,
  getAllUserRecommendationsService,
} from "../services"; // este hook te saca del backend las recomendaciones

// Creamos la función useRecommendations que se va a encargar de tener un estado donde se van a guardar las recomendaciones que lleguen del API para luego exportarlas. Además va a exportar en otro estado información sobre si la petición todavía está cargando o ya acabo de cargar y un último estado que nos indique si la petición tuvo algún error.
function useRecommendations(id) {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);

  // Utilizamos useEffect para hacer una petición de las recomendaciones y sólo se ejecuta cuando el componente se cargue
  useEffect(() => {
    // creamos una función asíncrona
    const loadRecommendations = async () => {
      try {
        // actualizamos el estado para indicar que se están cargando las recomendaciones en el momento de iniciar la función
        setLoading(true);

        // recuperamos la información de la solicitud enviada a la base de datos, en el caso de recibir una id facilitamos las recomendaciones de un usuario, sino todas las recomendaciones
        const data = id
          ? await getAllUserRecommendationsService(id)
          : await getAllRecommendationsService();
        // si todo va bien nos devuelve las recomendaciones
        setRecommendations(data.recommendations);
        setNext(data.next);
        setPrev(data.prev);
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
  }, [id]);

  return {
    recommendations,
    setRecommendations,
    next,
    prev,
    loading,
    error,
  };
}
export default useRecommendations;
