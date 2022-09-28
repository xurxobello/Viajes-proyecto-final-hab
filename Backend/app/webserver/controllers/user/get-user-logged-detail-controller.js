"use strict";

const mysqlPool = require("../../../database/mysql-pool");

async function getDetailUser(req, res) {
  let connection = null;

  // mediante destructuring sacamos el dato id de los path parameters
  const id = req.claims.userId;
  try {
    // establecemos una conexión con el Pool y seleccionamos los datos que queremos mostrar al elegir el id de la recommendation
    connection = await mysqlPool.getConnection();
    const [result] = await connection.execute(
      "SELECT id, avatar, name, nick, about_me, email, created_at FROM users WHERE id = ?",
      [id]
    );

    //liberamos la conexión
    connection.release();

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

module.exports = getDetailUser;
