const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../db/config');
require('colors');


class Server {

    constructor() {

        //Servidor Express
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/usuarios';

        //Conectar a Mongo
        this.conectarDB();

        //Middleweares
        this.middleweares();

        //Rutas
        this.routes();


    }

    /* -------------------------------------------------------------------------- */
    /*                                Middleweares                                */
    /* -------------------------------------------------------------------------- */

    middleweares() {

        //cors
        this.app.use(cors());

        //Lectura y parse del body
        this.app.use(express.json());

        //Directorio publico
        this.app.use(express.static('public'));

    }

    /* -------------------------------------------------------------------------- */
    /*                              Conexion a Mongo                              */
    /* -------------------------------------------------------------------------- */
    async conectarDB(){
        await dbConnection();
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Routes                                   */
    /* -------------------------------------------------------------------------- */

    routes() {
        this.app.use(this.usuariosPath, require('../routes/usuarios.routes'));
    }

    /* -------------------------------------------------------------------------- */
    /*                                   Listen                                   */
    /* -------------------------------------------------------------------------- */

    listen() {
        this.app.listen(this.port, () => {
            console.log('\nServidor corriendo en el puerto'.cyan, this.port.magenta);
        });
    }
}

module.exports = Server;