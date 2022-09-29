"use strict";

const mysqlPool = require("../../../database/mysql-pool");

async function top10(req, res) {
  let connection = null;

  try {
    // establecemos una conexión con el Pool
    connection = await mysqlPool.getConnection();

    // seleccionamos los datos que queremos enseñar en la búsqueda
    let result = await connection.execute(
      `SELECT r.*, COUNT(l.recommendation_id) AS totalLikes FROM recommendations r LEFT JOIN likes l ON r.id = l.recommendation_id GROUP BY r.id ORDER BY totalLikes DESC LIMIT 10`
    );

    // liberamos la conexión
    connection.release();

    // seleccionamos los datos que queremos enseñar en la búsqueda
    return res.send({
      data: result[0],
    });
  } catch (e) {
    console.error(e);
    return res.status(500).send({
      message: `Hemos encontrado una condición inesperada que impide completar la petición, rogamos lo intente en otro momento`,
    });
  }
}

module.exports = top10;
