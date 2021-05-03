const { Schema, model } = require('mongoose');

/* -------------------------------------------------------------------------- */
/*                              Esquema Usuarios                              */
/* -------------------------------------------------------------------------- */

const usuarioSchema = Schema({
    nombre: {
        type: String,
        require: [true, 'El nombre es requerido']
    },

    correo: {
        type: String,
        require: [true, 'El correo es obligatorio']
    },

    password: {
        type: String,
        require: [true, 'La contraseña es obligatoria']
    },

    img: {
        type: String
    },

    rol: {
        type: String,
        require: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },

    estado:{
        type:Boolean,
        default:true
    },

    google: {
        type: Boolean,
        default: false
    }
});

/* -------------------------------------------------------------------------- */
/*                             Retorno del Esquema                            */
/* -------------------------------------------------------------------------- */

usuarioSchema.methods.toJSON = function () {
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;
    return usuario;
}


module.exports = model('Usuario', usuarioSchema);