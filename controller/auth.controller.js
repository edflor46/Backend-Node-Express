const bcrypt = require('bcrypt');
const Usuario = require('../models/usuarios.models');
const { generarJWT } = require('../helpers/generar-jwt');
const { response } = require('express');
const { googleVerify } = require('../helpers/google-verify');


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

/* -------------------------------------------------------------------------- */
/*                                Google SignIn                               */
/* -------------------------------------------------------------------------- */


const googleSignin = async (req, res = response) => {

    //Id token 
    const { id_token } = req.body;

    try {
        //Verificar que existe el usuario en base al id token

        const { correo, nombre, img } = await googleVerify(id_token);

        let usuario = await Usuario.findOne({ correo });

        //Si no existe el usuario, crea uno nuevo
        if (!usuario) {
            const data = {
                nombre,
                correo,
                password: ':p',
                img,
                google: true
            };

            //Instanciar la clase del modelo usuarios
            usuario = new Usuario(data);

            //Guardar en mongo
            await usuario.save();
        }

        //Validar si el usuario esta dado de baja

        if (!usuario.estado) {
            return res.status(401).json({
                msg: 'El usuario con el que intentas acceder ha sido dado de baja'
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

        res.status(400).json({
            msg: 'El token de google no es valido'
        });

    }

}

module.exports = {
    login,
    googleSignin
}