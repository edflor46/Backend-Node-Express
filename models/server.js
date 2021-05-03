const express = require('express');
const cors = require('cors');
const {dbConnection} = require('../db/config');
require('colors');


class Server {

    constructor() {

        //Servidor Express
        this.app = express();
        
        //Variable de entorno
        this.port = process.env.PORT;

        //Path
        this.usuariosPath = '/api/usuarios';
        this.loginPath = '/api/auth';

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
        this.app.use(this.loginPath, require('../routes/auth.routes'));
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