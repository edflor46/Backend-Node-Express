const { Categoria, Usuario, Role, Producto } = require('../models');



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

const idValido = async (id) => {
    const existUsuario = await Usuario.findById(id);

    if (!existUsuario) {
        throw new Error(`El id ${id}, no existe`);
    }
}

/* -------------------------------------------------------------------------- */
/*                             Categoria ID Valido                            */
/* -------------------------------------------------------------------------- */

const idCategoriaValido = async (id) => {
    const idCategoria = await Categoria.findById(id);

    if (!idCategoria) {
        throw new Error(`El id ${id}, no existe`);
    }
}

/* -------------------------------------------------------------------------- */
/*                             Producto iD Valido                             */
/* -------------------------------------------------------------------------- */

const idProductoValido = async(id) => {
    const idProducto = await Producto.findById(id);

    if (!idProducto) {
        throw new Error(`El id ${id}, no existe`);
    }
}

module.exports = {
    rolValido,
    emailValido,
    idValido,
    idCategoriaValido,
    idProductoValido
}