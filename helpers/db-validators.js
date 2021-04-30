const Role = require('../models/rol.models');
const Usuario = require('../models/usuarios.models');

/* -------------------------------------------------------------------------- */
/*                                 Rol valido                                 */
/* -------------------------------------------------------------------------- */

const rolValido = async (rol = '') => {

    const rolExist = await Role.findOne({ rol });

    if (!rolExist) {
        throw new Error(`El rol ${rol}, no es un rol valido en la base de datos`);
    }
}

/* -------------------------------------------------------------------------- */
/*                               Email Existente                              */
/* -------------------------------------------------------------------------- */

const emailValido = async (correo = '') => {

    const emailExist = await Usuario.findOne({ correo });

    if (emailExist) {
        throw new Error(`El email ${correo}, ya esta registrado`);
    }
}

/* -------------------------------------------------------------------------- */
/*                                  Id Valido                                 */
/* -------------------------------------------------------------------------- */

const idValido = async(id) => {
    const existUsuario = await Usuario.findById(id);

    if (!existUsuario) {
        throw new Error(`El id ${id}, no existe`);
    }
}

module.exports = {
    rolValido,
    emailValido,
    idValido
}