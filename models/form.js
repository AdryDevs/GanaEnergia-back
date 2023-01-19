
const MongoClient = require("mongodb").MongoClient;

const url = 'mongodb://127.0.0.1:27017/DB';
const dbName = "form";

class Form {
    constructor(formData) {
        this.nombre = formData.nombre;
        this.apellido1 = formData.apellido1;
        this.apellido2 = formData.apellido2;
        this.documento = formData.documento;
        this.localidad = formData.localidad;
        this.cp = formData.cp;
        this.telefono = formData.telefono; 
    }

    
    save = async () => {
        try {
            const client = new MongoClient(url);
            await client.connect();
            const db = client.db(dbName);
            const formCollection = db.collection(dbName);
            await formCollection.insertOne(this);
            client.close();
        } catch (err) {
            console.log("error al guardar el formulario en save");
            console.log(err);
        }
    };

    static async getAllForms() {
        try {
            const client = new MongoClient(url);
            await client.connect();
            const db = client.db(dbName);
            const formCollection = db.collection(dbName);
            const forms = await formCollection.find().toArray();
            client.close();
            return forms;
        }
        catch (err) {
            console.log("error al buscar los formularios en getAllForms");
            console.log(err);
        }
    }


    static async getPostalCode(municipio_nombre) {
        const client = new MongoClient(url);
        await client.connect();
        const db = client.db(dbName);
        const formCollection = db.collection(dbName);
        const form = await formCollection.findOne({ municipio_nombre });
        client.close();
        return form ? form.cp : null;
    }
}

module.exports = Form;
