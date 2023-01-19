const express = require('express');
const router = express.Router();
const { submitForm, getByMunicipio, getAllForms  } = require('./controllers');





// nuevo formulario
router.post('/form', submitForm);

// Cp por localidad

router.get('/postalcode/:location', getByMunicipio);

// todos los formularios

router.get('/', getAllForms);

module.exports = router;