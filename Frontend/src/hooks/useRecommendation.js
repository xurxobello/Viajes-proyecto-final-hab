import { useEffect, useState } from "react";
import { getSingleRecommendationService } from "../services";

// Creamos la función useRecommendation que va a recibir la id de la recomendación que queremos mostrar y que se va a encargar de tener un estado donde se va a guardar la recomendación que llegue del API para luego exportarla. Además va a exportar en otro estado información sobre si la petición todavía está cargando o acabó de cargar y un último estado que nos indique si la petición tuvo algún error.
function useRecommendation(id) {
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Utilizamos useEffect para hacer una petición de la recomendación y este se va a ejecutar cuando se monte y cuando el id cambie
  useEffect(() => {
    const loadRecommendation = async () => {
      try {
        // actualizamos el estado para indicar que se están cargando las recomendaciones en el momento de iniciar la función
        setLoading(true);

        // recuperamos la información de la solicitud enviada a la base de datos
        const data = await getSingleRecommendationService(id);

        // si todo va bien nos devuelve la recomendación
        setRecommendation(data);
      } catch (error) {
        // si da un error nos devuelve el mensaje del error
        setError(error.message);
      } finally {
        // hacemos un finally para que haya o no haya error la carga pase a ser false
        setLoading(false);
      }
    };
    // ejecutamos la función
    loadRecommendation();
  }, [id]);

  return { recommendation, loading, error };
}
export default useRecommendation;
