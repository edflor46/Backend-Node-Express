const { ObjectId } = require('mongoose').Types;
const { Usuario, Categoria, Producto } = require('../models');

const coleccionesPermitidas = [
    'categorias',
    'productos',
    'roles',
    'usuarios'
];

/* -------------------------------------------------------------------------- */
/*                             Buscar por usuarios                            */
/* -------------------------------------------------------------------------- */

const buscarUsuarios = async (termino = '', res) => {

    //Termino de busqueda valido
    const mongoIDValid = ObjectId.isValid(termino);

    //Retornar respuesta en base al termino
    if (mongoIDValid) {
        const usuario = await Usuario.findById(termino);
        return res.json({
            results: (usuario) ? [usuario] : []
        });
    }

    //Resultados que tengan cualquier similitud al termino
    const regex = new RegExp(termino, 'i');

    const usuarios = await Usuario.find({
        $or: [{ nombre: regex }, { correo: regez }],
        $and: [{ estado: true }]
    });

    //Respuesta del servidor
    res.json({
        results: usuarios
    });
}

/* -------------------------------------------------------------------------- */
/*                            Buscar por Categorias                           */
/* -------------------------------------------------------------------------- */

const buscarCategorias = async (termino = '', res) => {

    //Termino de busqueda valido
    const mongoIDValid = ObjectId.isValid(termino);

    //Retornar respuesta en base al termino
    if (mongoIDValid) {
        const categoria = await Categoria.findById(termino);
        return res.json({
            results: (categoria) ? [categoria] : []
        });
    }

    //Resultados que tengan cualquier similitud al termino
    const regex = new RegExp(termino, 'i');

    const categorias = await Categoria.find({ nombre: regex, estado: true });

    //Respuesta del servidor
    res.json({
        results: categorias
    })
}

/* -------------------------------------------------------------------------- */
/*                            Buscar por productos                            */
/* -------------------------------------------------------------------------- */

const buscarProductos = async (termino = '', res) => {

    //Termino de busqueda valido
    const mongoIDValid = ObjectId.isValid(termino);

    //Retornar respuesta en base al termino
    if (mongoIDValid) {
        const producto = await Producto.findById(termino).populate('categoria', 'nombre');
        return res.json({
            results: (producto) ? [producto] : []
        });
    }

    //Resultados que tengan cualquier similitud al termino
    const regex = new RegExp(termino, 'i');

    const productos = await Producto.find({ nombre: regex, estado: true }).populate('categoria', 'nombre');

    //Respuesta del servidor
    res.json({
        results: productos
    })
}

/* -------------------------------------------------------------------------- */
/*                               Lanzar busqueda                              */
/* -------------------------------------------------------------------------- */

const buscar = async (req, res) => {
    //Req params
    const { coleccion, termino } = req.params;

    //Validar que la busqueda sea permitida
    if (!coleccionesPermitidas.includes(coleccion)) {
        return res.status(400).json({
            msg: `Las colecciones permitidas son: ${coleccionesPermitidas}`
        });
    }

    //En caso de ser productos, categorias usuarios, caer en los casos
    switch (coleccion) {
        case 'usuarios':
            buscarUsuarios(termino, res);
            break;

        case 'categorias':
            buscarCategorias(termino, res);
            break;

        case 'productos':
            buscarProductos(termino, res);
            break;

        default:
            res.status(500).json({
                msg: 'Algo salio mal'
            });
            break;
    }

}

module.exports = {
    buscar
}