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

        //Paths
        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            usuarios:   '/api/usuarios'
        }
  

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
        this.app.use(this.paths.auth,           require('../routes/auth.routes'));
        this.app.use(this.paths.buscar,         require('../routes/buscar.route'));
        this.app.use(this.paths.categorias,     require('../routes/categorias.routes'));
        this.app.use(this.paths.productos,      require('../routes/productos.route'));
        this.app.use(this.paths.usuarios,       require('../routes/usuarios.routes'));
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