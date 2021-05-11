const { Router } = require('express');
const { check } = require('express-validator');
const {
  crearCategoria,
  editarCategoria,
  borrarCategoria,
  obtenerCategorias,
  obtenerCategoria,
} = require("../controller/categorias.controller");
const { idCategoriaValido } = require('../helpers/db-validators');
const { validarCampos } = require('../middleweares/validaciones');
const { validarJWT } = require('../middleweares/validar-jwt');
const { rolPrivileges } = require('../middleweares/validar-roles');

const router = Router();

/* -------------------------------------------------------------------------- */
/*                                   GET ALL                                  */
/* -------------------------------------------------------------------------- */

router.get('/', obtenerCategorias);

/* -------------------------------------------------------------------------- */
/*                                GET Categoria                               */
/* -------------------------------------------------------------------------- */

router.get('/:id', [
    check('id', 'No es un id valido').isMongoId(),
    check('id').custom(idCategoriaValido),
    validarCampos
], obtenerCategoria);
/* -------------------------------------------------------------------------- */
/*                                    POST                                    */
/* -------------------------------------------------------------------------- */

router.post('/', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    validarCampos
], crearCategoria);
/* -------------------------------------------------------------------------- */
/*                                     PUT                                    */
/* -------------------------------------------------------------------------- */

router.put('/:id', [
    validarJWT,
    check('nombre', 'El nombre es obligatorio').not().isEmpty(),
    check('id', 'El id no es valido').isMongoId(),
    check('id').custom(idCategoriaValido),
    validarCampos
], editarCategoria);
/* -------------------------------------------------------------------------- */
/*                                   DELETE                                   */
/* -------------------------------------------------------------------------- */

router.delete('/:id', [
    validarJWT,
    rolPrivileges('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id').custom(idCategoriaValido),
    check('id', 'El id no es valido').isMongoId(),
    validarCampos
], borrarCategoria);

module.exports = router;

