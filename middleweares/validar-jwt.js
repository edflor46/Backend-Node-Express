
const { request, response } = require('express');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuarios.models');

/* -------------------------------------------------------------------------- */
/*                                 Validar JWT                                */
/* -------------------------------------------------------------------------- */

const validarJWT = async (req = request, res = response, next) => {

    const token = req.header('x-token');

    //Verifar si vienen un jwt en los headers de la peticion

    if (!token) {
        return res.status(401).json({
            msg: 'No existe un token valido'
        })
    }

    try {
        const {uid} = jwt.verify(token, process.env.KEY);

        //Validar que el usuario sea el mismo al uid
        const usuario = await Usuario.findById(uid);

        if (!usuario) {
            return res.status(401).json({
                msg: 'Token no valido'
            });
        }

        //Evitar hacer match con un usuario que este dado de baja
        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'Token no valido'
            });
        }

        req.usuario = usuario;
        next();

    } catch (error) {
        console.log(`${error}`.red);
        res.status(500).json({
            msg: 'Token no valido'
        });
    }
}

module.exports = {
    validarJWT
}
