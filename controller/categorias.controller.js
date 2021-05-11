const { request } = require("express");
const { Categoria } = require("../models");

/* -------------------------------------------------------------------------- */
/*                               GET Categorias                               */
/* -------------------------------------------------------------------------- */

const obtenerCategorias = async (req, res) => {
    //Query
    const { limit = 5, since = 0 } = req.query;
    const query = { estado: true };

    //Paginado
    const [total, categorias] = await Promise.all([
        Categoria.countDocuments(query),
        Categoria.find(query)
            .populate('usuario', 'nombre')
            .skip(Number(since))
            .limit(Number(limit))
    ]);

    //Respuesta del servidor
    res.status(201).json({
        total,
        categorias,
    });
};

/* -------------------------------------------------------------------------- */
/*                                GET Categoria                               */
/* -------------------------------------------------------------------------- */

const obtenerCategoria = async(req, res) => {

    //Params
    const {id} = req.params;

    //Obtener categoria mediante el id
    const categoria = await  Categoria.findById(id).populate('usuario', 'nombre');

    //respuesta del servidor
    res.json(categoria);

}

/* -------------------------------------------------------------------------- */
/*                               POST Categoria                               */
/* -------------------------------------------------------------------------- */

const crearCategoria = async (req = request, res) => {
    //Recibir nombre de la request y pasarlo a mayus
    const nombre = req.body.nombre.toUpperCase();

    //Validar si ya existe una categoria
    const categoriaDB = await Categoria.findOne({ nombre });

    if (categoriaDB) {
        return res.status(400).json({
            msg: `La categoria ${categoriaDB} ya existe, elige otro`,
        });
    }

    //Data a guardar
    const data = {
        nombre,
        usuario: req.usuario._id,
    };

    //Instanciar modelo Categoria
    const categoria = new Categoria(data);

    //Guardar en Mongo
    await categoria.save();

    //Respuesta del servidor
    res.status(201).json(categoria);
};

/* -------------------------------------------------------------------------- */
/*                                PUT Categoria                               */
/* -------------------------------------------------------------------------- */

const editarCategoria = async (req, res) => {
    //req param
    const { id } = req.params;

    //Desestructuracion body
    const { estado, usuario, ...data } = req.body;

    //Comparar data
    data.nombre = data.nombre.toUpperCase();
    data.usuario = req.usuario._id;

    //Retornar data actualizada en la peticion
    const categoria = await Categoria.findByIdAndUpdate(id, data, { new: true });

    res.status(201).json(categoria);
};

/* -------------------------------------------------------------------------- */
/*                              DELETE Categoria                              */
/* -------------------------------------------------------------------------- */

const borrarCategoria = async (req, res) => {
    //req param
    const { id } = req.params;

    //Eliminar (cambiar estado)
    const categoriaBorrada = await Categoria.findByIdAndUpdate(
        id,
        { estado: true },
        { new: true }
    ).populate("usuario", "nombre");

    //respuesta del servidor
    res.status(201).json(categoriaBorrada);
};

module.exports = {
    borrarCategoria,
    crearCategoria,
    editarCategoria,
    obtenerCategorias,
    obtenerCategoria
};
