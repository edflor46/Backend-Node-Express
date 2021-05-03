
const jwt = require('jsonwebtoken');
require('colors');

/* -------------------------------------------------------------------------- */
/*                                 Generar JWT                                */
/* -------------------------------------------------------------------------- */

const generarJWT = (uid = '') => {

    //Retornar una promesa
    return new Promise((resolve, reject) => {

        const payload = {uid};

        //Construir jwt
        jwt.sign(payload, process.env.KEY, {
            expiresIn: '4h'
        },(err, token) => {
            if (err) {
                console.log(`${err}`.red);
                reject('No se pudo generar el token')
            }else{
                console.log(`\n$Token de acceso: ${token.cyan}`.yellow);
                resolve(token);
            }
        });

    });

}

module.exports = {
    generarJWT
}