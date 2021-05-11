const { Router } = require('express');
const { check } = require('express-validator');
const {
  getProductos,
  getProducto,
  crearProducto,
  actualizarProducto,
  borrarProducto,
} = require("../controller/productos.controller");
const { idCategoriaValido, idProductoValido } = require('../helpers/db-validators');
const { validarCampos } = require('../middleweares/validaciones');
const { validarJWT } = require('../middleweares/validar-jwt');
const { rolPrivileges } = require('../middleweares/validar-roles');

const router = Router();

/* -------------------------------------------------------------------------- */
/*                                GET Productos                               */
/* -------------------------------------------------------------------------- */

router.get('/', getProductos);

/* -------------------------------------------------------------------------- */
/*                                GET Producto                                */
/* -------------------------------------------------------------------------- */

router.get('/:id', [
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(idProductoValido),
  validarCampos
],getProducto);

/* -------------------------------------------------------------------------- */
/*                               Crear Producto                               */
/* -------------------------------------------------------------------------- */

router.post('/', [
  validarJWT,
  check('nombre', 'El nombre es obligatorio').not().isEmpty(),
  check('categoria', 'No es un id de mongo').isMongoId(),
  check('categoria').custom(idCategoriaValido),
  validarCampos
],crearProducto);

/* -------------------------------------------------------------------------- */
/*                             Actualizar Producto                            */
/* -------------------------------------------------------------------------- */

router.put('/:id', [
  validarJWT,
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(idProductoValido),
  validarCampos
],actualizarProducto);

/* -------------------------------------------------------------------------- */
/*                               Borrar Producto                              */
/* -------------------------------------------------------------------------- */

router.delete('/:id', [
  validarJWT,
  rolPrivileges('ADMIN_ROLE', 'VENTAS_ROLE'),
  check('id', 'No es un id valido').isMongoId(),
  check('id').custom(idProductoValido),
  validarCampos
],borrarProducto)

module.exports = router;