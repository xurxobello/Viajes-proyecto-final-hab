"use strict";

const mysqlPool = require("../../../database/mysql-pool");

async function getNickRecommendation(req, res) {
  let connection = null;

  // mediante destructuring sacamos el dato recommendationId de los path parameters
  const { recommendationId } = req.params;

  try {
    // establecemos una conexión con el Pool
    connection = await mysqlPool.getConnection();

    // seleccionamos los datos que queremos enseñar en la búsqueda
    let [result] = await connection.execute(
      `SELECT u.nick FROM users u LEFT JOIN recommendations r ON u.id = r.user_id WHERE r.id = ?`,
      [recommendationId]
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

module.exports = getNickRecommendation;
