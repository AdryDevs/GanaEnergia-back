

const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());



const url = 'mongodb://127.0.0.1:27017/DB';

const client = new MongoClient(url , { useNewUrlParser: true });

const dbName = 'DB';
const db = client.db(dbName);
const coll = db.collection('form');
const cursor = coll.find({});

const formRouter = require('./routes');
app.use('/formdata', formRouter);


client.connect(function (err) {
    console.log("Conectado a la base de datos MongoDB");

    const cors = require('cors')

    app.use(cors())

    app.listen(3000, function () {
        console.log('Servidor iniciado en el puerto 3000');
    });
});


module.exports = app;
