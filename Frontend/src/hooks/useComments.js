import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getAllCommentsService } from "../services";

// Creamos la función useRecommendations que se va a encargar de tener un estado donde se van a guardar los comentarios que lleguen del API para luego exportarlos. Además va a exportar en otro estado información sobre si la petición todavía está cargando o ya acabo de cargar y un último estado que nos indique si la petición tuvo algún error.
function useComments() {
  const [comments, setComments] = useState([]);
  const [load, setLoading] = useState(false);
  const [err, setError] = useState("");
  const [next, setNext] = useState(null);
  const [prev, setPrev] = useState(null);
  const { id } = useParams();

  // Utilizamos useEffect para hacer una petición de los comentarios y sólo se ejecuta cuando el componente se cargue
  useEffect(() => {
    // creamos una función asíncrona
    const loadComments = async () => {
      try {
        // actualizamos el estado para indicar que se están cargando las recomendaciones en el momento de iniciar la función
        setLoading(true);

        // recuperamos la información de la solicitud enviada a la base de datos, en el caso de recibir una id facilitamos las recomendaciones de un usuario, sino todas las recomendaciones
        const data = await getAllCommentsService(id);
        // si todo va bien nos devuelve las recomendaciones
        setComments(data.comments);
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
    loadComments();
  }, [id]);

  return {
    comments,
    setComments,
    next,
    prev,
    load,
    err,
  };
}
export default useComments;
