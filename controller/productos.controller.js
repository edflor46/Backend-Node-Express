
const { Producto } = require('../models');


/* -------------------------------------------------------------------------- */
/*                                   GET ALL                                  */
/* -------------------------------------------------------------------------- */

const getProductos = async (req, res) => {

    //Params
    const { limit = 5, since = 0 } = req.query;
    const query = { estado:true };

    //Paginado / Retorno de data
    const [total, productos] = await Promise.all([
        Producto.countDocuments(query),
        Producto.find(query)
            .populate('usuario', 'nombre')
            .populate('categoria', 'nombre')
            .skip(Number(since))
            .limit(Number(limit))
    ]);


    res.status(201).json({
        total, 
        productos
    })
}

/* -------------------------------------------------------------------------- */
/*                                GET Producto                                */
/* -------------------------------------------------------------------------- */

const getProducto = async (req, res) => {
    //Params
    const { id } = req.params;

    //Buscar id
    const producto = await Producto.findById(id)
        .populate('usuario', 'nombre')
        .populate('categoria', 'nombre')

    res.status(201).json({
        producto
    });
}

/* -------------------------------------------------------------------------- */
/*                            POST - Crear Producto                           */
/* -------------------------------------------------------------------------- */
const crearProducto = async (req, res) => {

    //req body
    const { estado, usuario, ...body } = req.body;

    //Validar si existe el producto en bd
    const productoDB = await Producto.findOne({ nombre: body.nombre });

    if (productoDB) {
        return res.status(400).json({
            msg: `El producto ${productoDB.nombre} ya existe, intenta con otro`
        });
    }

    //Data a guardar
    const data = {
        ...body,
        nombre: body.nombre.toUpperCase(),
        usuario: req.usuario._id
    }

    //Instanciar modelo
    const producto = new Producto(data);

    //Guardar en base de datos

    await producto.save();

    //Respuesta del servidor
    res.status(201).json(producto)
}
/* -------------------------------------------------------------------------- */
/*                          PUT - Actualizar Producto                         */
/* -------------------------------------------------------------------------- */

const actualizarProducto = async (req, res) => {
    //req params
    const {id} = req.params;
    const { estado, usuario, ...body } = req.body;

    //Validar que exista el nombre
    if (body) {
        body.nombre.toUpperCase();
    }

    //id usuario
    body.usuario = req.usuario._id;

    //Actualizar
    const producto = await Producto.findByIdAndUpdate(id, body, {new:true});

    //Respuesta del servidor
    res.json(producto);
}
/* -------------------------------------------------------------------------- */
/*                               DELETE Producto                              */
/* -------------------------------------------------------------------------- */

const borrarProducto = async (req, res) => {
    //req param
    const {id} = req.params;

    //Dar de baja
    const producto = await Producto.findByIdAndUpdate(id, {estado:false});

    //Respuesta del servidor
    res.status(201).json(producto);

    
}

module.exports = {
    getProductos,
    getProducto,
    crearProducto,
    actualizarProducto,
    borrarProducto,
}