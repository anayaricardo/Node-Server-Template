const express = require("express");
const dbConnection = require("../database/config");
const cors = require("cors");
const { UsuarioRouter } = require("../routes/index");

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT || 8080;

    //Paths
    this.paths = {
      usuario: "/api/usuario",
    };

    //Conexion a dbs
    this.conectarDB();

    //Middlewares
    this.middlewares();

    //Rutas
    this.router();
  }

  //Conexion a dbs
  async conectarDB() {
    //CREAR FUNCIONALIDAD PARA CONECTAR DB
    await dbConnection();
  }

  middlewares() {
    //CORS
    this.app.use(cors());

    //Lectura y parseo de body
    this.app.use(express.json());
  }

  router() {
    this.app.use(this.paths.usuario, UsuarioRouter);
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Running in the por ${this.port}`);
    });
  }
}

module.exports = Server;
