
const express = require('express');
const router = express.Router();
const Form = require('./models/form'); 
const { db } = require('./app');
const { MongoClient } = require('mongodb');

const url = 'mongodb://127.0.0.1:27017/DB';
const dbName = "form";

const datosController = {}

// nuevo formulario
datosController.submitForm = async (req, res) => {
    try {
        const formData = new Form(req.body);
        formData.save();
        res.status(201).json(formData);
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: "no se ha podido guardar el formulario" });
    }
};


// Cp por localidad
datosController.getByMunicipio = async (req, res) => {
    try {
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        const formCollection = db.collection(dbName);
        const forms = await formCollection.find().toArray();
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
datosController.getAllForms = async (req, res) => {
    try {
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        const formCollection = db.collection(dbName);
        const forms = await formCollection.find().toArray();
        client.close();
        res.json(forms);
    }
    catch (err) {
        console.log("error al buscar los formularios en getAllForms");
        console.log(err);
    }
}


module.exports = datosController