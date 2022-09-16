'use strict';

const cors = require('cors')
const dotenv = require("dotenv");
const express = require('express');
const mysqlPool = require('./app/database/mysql-pool');
const webServer = require('./app/webserver')

dotenv.config();

const app = express();

// añadimos esto para no tener problemas a la hora de conectar con el frontend
app.use(cors());

// declaramos las variable que vamos a definir en el archivo .env
const port = process.env.PORT;


if (!port) {
    console.error('PORT debe ser definido en el archivo .env');
    process.exit(1);
}

// llamamos a los módulos exportados
async function initApp() {
    try {
        await mysqlPool.connect();
        await webServer.listen(port);

        console.log(`Servidor escuchando en el puerto: ${port}`);
    } catch (e) {
        console.log(e);
        process.exit(1);
    }
}
initApp();