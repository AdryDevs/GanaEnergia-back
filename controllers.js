
const express = require('express');
const router = express.Router();
const Form = require('./models/form'); 
const { db } = require('./app');

const datosController = {}

// nuevo formulario
datosController.submitForm = async (req, res) => {
    try {
        const formData = new Form(req.body);
        console.log(formData);
        formData.save();
        res.status(201).json(formData);
        res.send("formulario guardado");
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "no se ha podido guardar el formulario" });

    }
};

// Cp por localidad
datosController.getByMunicipio = async (req, res) => {
    try {
        const formData = await Form.findOne({ municipio_nombre: req.params.municipio_nombre });
        if (formData) {
            res.json(formData.cp);
        } else {
            res.json({ message: 'Postal code not found' });
        }
    } catch (err) {
        return res.status(500).json({ message: "error al buscar el código postal" });
    }
};

// todos los formularios
// datosController.getAllForms = async (req, res) => {

//     try {
//         const formData = await db.collection("form").find();
//         res.json(formData);
//     } catch (err) {
//         res.status(400).json({ message: "error al buscar los formularios" });
//         console.log(err);
//     }
// };


module.exports = datosController