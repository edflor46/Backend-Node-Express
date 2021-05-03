const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarios.models');
const { generarJWT } = require('../helpers/generar-jwt');


/* -------------------------------------------------------------------------- */
/*                              Login Controlador                             */
/* -------------------------------------------------------------------------- */

const login = async (req, res) => {

    const { correo, password } = req.body;

    try {
        //Validar si el email existe
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña incorrectos'
            });
        }

        //Validar si el usuario esta activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'El usuario con el que intentas ingresar ha sido dado de baja, contacta al administrador'
            });
        }

        //Comparar password
        const validPassword = bcrypt.compareSync(password, usuario.password);

        if (!validPassword) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña incorrectos'
            });
        }

        //Generar JWT
        const token = await generarJWT(usuario.id);

        //Respuesta del servidor
        res.json({
            usuario,
            token
        })
    } catch (error) {
        console.log(`${error}`.red);
        res.status(500).json({
            msg: 'Oooops... algo salio mal'
        });
    }



}

module.exports = {
    login
}