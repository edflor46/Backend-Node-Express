

/* -------------------------------------------------------------------------- */
/*                                 Rol valido                                 */
/* -------------------------------------------------------------------------- */

const rolPrivileges = (...roles) => {


    return (req, res, next) => {

        if (!req.usuario) {
            return res.status(500).json({
                msg: 'No se puede verificar el rol de usuario si no hay un token existente'
            });
        }

        if (!roles.includes(req.usuario.rol)) {
            return res.status(401).json({
                msg: `Se requiere uno de estos roles ${roles} para ejecutar esta accion`
            });
        }

        next();

    }

}

module.exports = {
    rolPrivileges
}