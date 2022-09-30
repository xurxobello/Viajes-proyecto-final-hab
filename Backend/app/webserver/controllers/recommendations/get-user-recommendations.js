"use strict";

const mysqlPool = require("../../../database/mysql-pool");

// indicamos el número máximo de elementos que vamos a querer mostrar por página
const maxRecommendationsPerPage = 6;

async function getUserRecommendations(req, res) {
  let connection = null;

  // mediante destructuring sacamos el dato userId de los path parameters
  const { userId } = req.params;

  // obtenemos el valor de la página de los query parameters, convirtiéndolo en número, indicando que es en base decimal y en caso de que no se especifique nada nos muestre la página 1
  const page = parseInt(req.query.page, 10) || 1;

  // obtenemos los datos que vamos a omitir para empezar a partir de ese número, por ejemplo:
  // si queremos empezar en la página 1: ( 1 - 1 ) * maxRecommendationsPerPage = 0, por lo que comenzamos a mostrar resultados a partir del resultado siguiente al 0
  // si queremos empezar en la página 2: ( 2 - 1 ) * maxRecommendationsPerPage = 4, por lo que comenzamos a mostrar resultados a partir del resultado siguiente al 4
  const offset = (page - 1) * maxRecommendationsPerPage;

  try {
    // establecemos una conexión con el Pool
    connection = await mysqlPool.getConnection();

    // obtenemos el total de resultados de la búsqueda por el filtro que pongamos para poder hacer la paginación
    const [queryCountTotal] = await connection.execute(
      `SELECT COUNT(*) AS totalRecommendations FROM recommendations WHERE user_id = ?`,
      [userId]
    );

    // seleccionamos los datos que queremos enseñar en la búsqueda y los filtros por los que se puede realizar la misma en el caso de que no se ordenen por likes, mostrando primero los más recientes

    let result = await connection.execute(
      `SELECT * FROM recommendations WHERE user_id = ? ORDER BY created_at DESC LIMIT ${maxRecommendationsPerPage} OFFSET ${offset}`,
      [userId]
    );

    // liberamos la conexión
    connection.release();

    // declaramos el número total del comentarios obtenidos
    const totalRecommendations = queryCountTotal[0].totalRecommendations;

    // calculamos cual va a ser la última página. Math.ceil nos devuelve el número entero mayor o igual (en caso de ser negativo) más próximo a un número dado.
    const lastPage = Math.ceil(
      totalRecommendations / maxRecommendationsPerPage
    );

    // indicamos los datos que vamos a querer obtener al hacer la solicitud en postman. Math.ceil nos devuelve el número entero mayor o igual (en caso de ser negativo) más próximo a un número dado.
    let responseBody = null;

    // seleccionamos los datos que queremos enseñar en la búsqueda

    responseBody = {
      totalRecommendations,
      lastPage,
      page,
      // creamos un enlace para ir a la primera página
      goToFirstPage:
        page > 1
          ? `http://${
              req.headers.host
            }/api/recommendations/user/${userId}?page=${1}`
          : null,

      //Usamos un ternario para devolver la página anterior sólo si no es la primera y para devolver la página siguiente sólo si no es la última. OJO que el valor de la query (page) es un string!
      //${req.headers.host}
      prev:
        page > 1
          ? `http://${
              req.headers.host
            }/api/recommendations/user/${userId}?page=${+page - 1}`
          : null,

      // Hay siguiente si no es la ultima
      next:
        page < lastPage
          ? `http://${
              req.headers.host
            }/api/recommendations/user/${userId}?page=${+page + 1}`
          : null,

      // creamos un enlace para ir a la última página
      goToLastPage:
        page < lastPage
          ? `http://${req.headers.host}/api/recommendations/user/${userId}?page=${lastPage}`
          : null,

      recommendations: result[0],
    };

    return res.send({
      data: responseBody,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send({
      message: `Hemos encontrado una condición inesperada que impide completar la petición, rogamos lo intente en otro momento`,
    });
  }
}

module.exports = getUserRecommendations;
