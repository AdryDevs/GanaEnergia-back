const express = require('express');
const router = express.Router();
const { submitForm, getByMunicipio  } = require('./controllers');
const { getAllForms } = require('./models/form');




// nuevo formulario
router.post('/form', submitForm);

// Cp por localidad

router.get('/postalcode/:location', getByMunicipio);

// todos los formularios

router.get('/', getAllForms);

module.exports = router;