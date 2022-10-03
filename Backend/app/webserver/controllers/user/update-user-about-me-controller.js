"use strict";

const Joi = require("joi");
const mysqlPool = require("../../../database/mysql-pool");

async function validate(payload) {
  const schema = Joi.object({
    about_me: Joi.string().max(255),
  });

  Joi.assert(payload, schema);
}

async function updateUserAboutMe(req, res) {
  const { userId } = req.claims;
  const about_me = req.body.about_me;

  // Validar datos
  try {
    const payload = {
      about_me,
    };

    await validate(payload);
  } catch (e) {
    return res.status(400).send({
      message: `Debes introducir un SOBRE MI que no exceda de los 255 caracteres`,
    });
  }

  // Actualizar datos usuario
  let connection = null;
  const query = `UPDATE users
    SET about_me = ?
    WHERE id = ?`;

  try {
    connection = await mysqlPool.getConnection();
    await connection.query(query, [about_me, userId]);
    connection.release();
    return res.status(200).send({
      message: `SOBRE MI modificado correctamente`,
    });
  } catch (e) {
    if (connection) {
      connection.release();
    }
    console.log(e);
    return res.status(500).send({
      message: `Hemos encontrado una condición inesperada que impide completar la petición, rogamos lo intente en otro momento`,
    });
  }
}

module.exports = updateUserAboutMe;
