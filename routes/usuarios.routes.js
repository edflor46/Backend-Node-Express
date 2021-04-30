const { Router } = require('express');
const { check } = require('express-validator');
const { usuariosGet, usuariosPost, usuariosDelete, usuariosPut } = require('../controller/usuarios.controller');
const { emailValido, rolValido, idValido } = require('../helpers/db-validators');
const {validarCampos} = require('../middleweares/validaciones');



const router = Router();

/* -------------------------------------------------------------------------- */
/*                                     Get                                    */
/* -------------------------------------------------------------------------- */

router.get('/', usuariosGet);

/* -------------------------------------------------------------------------- */
/*                                    Post                                    */
/* -------------------------------------------------------------------------- */

router.post('/', [
    check('nombre'  , 'El nombre es obligatorio').not().isEmpty(),
    check('password', 'El password debe tener al menos 6 caracteres').isLength({ min: 6 }),
    check('correo'  , 'El correo no es valido').isEmail(),
    check('correo').custom(emailValido),
    check('rol').custom(rolValido),
    validarCampos
],
    usuariosPost);

/* -------------------------------------------------------------------------- */
/*                                     Put                                    */
/* -------------------------------------------------------------------------- */
router.put('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(idValido),
    check('rol').custom(rolValido),
    validarCampos
], usuariosPut);

/* -------------------------------------------------------------------------- */
/*                                   Delete                                   */
/* -------------------------------------------------------------------------- */
router.delete('/:id', [
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom(idValido),
    validarCampos
], usuariosDelete);



module.exports = router;