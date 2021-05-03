const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controller/auth.controller');
const {validarCampos} = require('../middleweares/validaciones');

const router = Router();

router.post('/login',[
    check('correo', 'El correo es obligatorio').isEmail(),
    check('password', 'El password es obligatorio').not().isEmpty(),
    validarCampos
], login);


module.exports = router;