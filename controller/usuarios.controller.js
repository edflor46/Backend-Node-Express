const { response, request } = require('express');
const bcryptjs = require('bcrypt');
const Usuario = require('../models/usuarios.models');


/* -------------------------------------------------------------------------- */
/*                                     Get                                    */
/* -------------------------------------------------------------------------- */

const usuariosGet = async (req = request, res = response) => {

    const { limit = 5, to = 0 } = req.query;
    const query = { estado:true };

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments(query),
        Usuario.find(query)
        .skip(Number(to))
        .limit(Number(limit))
    ]);
 
    res.json({
        total,
        usuarios
    })
}


/* -------------------------------------------------------------------------- */
/*                                    Post                                    */
/* -------------------------------------------------------------------------- */

const usuariosPost = async (req, res) => {
    //Request
    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol });

    //Encriptar password
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en Mongo
    await usuario.save();

    //Respuesta del servidor
    res.json({
        usuario
    })
}

/* -------------------------------------------------------------------------- */
/*                                     Put                                    */
/* -------------------------------------------------------------------------- */
const usuariosPut = async (req, res) => {

    //Params
    const { id } = req.params;
    const { _id, password, google, correo, ...resto } = req.body;

    //validar en base de datos
    if (password) {
        
        //Encriptar password
        const salt = bcryptjs.genSaltSync();
        resto.password = bcryptjs.hashSync(password, salt);
    }

    //Actualizar en base de datos
    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    //Respuesta del servidor
    res.json(usuario);
}

/* -------------------------------------------------------------------------- */
/*                                   Delete                                   */
/* -------------------------------------------------------------------------- */

const usuariosDelete = async (req, res ) => {

    const {id} = req.params;

    //Borrar de mandera definitiva
    // const usuario = await Usuario.findByIdAndDelete(id);

    //Dar de baja usuario
    const usuario = await Usuario.findByIdAndUpdate(id, {estado:false});

    //Respuesta del servidor
    res.json(usuario);
}
module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosDelete
}