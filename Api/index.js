const express = require('express') // framework (libreria) sirve para crear aplicaciones 

const app = express() // instancia de la app

const mongoose = require('mongoose');

const Usuario = require('./models/usuarios'); // importamos el schema de otra carpeta

const cors = require('cors');

const DSN = 'mongodb://localhost:27017/IRDB'; // Data source name

app.use(cors());

app.use(express.static('public')); // middleware 

app.use(async function (req, res, next) {
    try {
        await mongoose.connect(DSN, {
            serverSelectionTimeoutMS: 3000
        }); // async //ORM: Object Relational Mapper 
        
        mongoose.connection.on('error', err => {
            console.log(err);
            res.status(500).end();
        });

        mongoose.connection.on('open', err => {
            //next()
        });
        next();

    } catch (err) {
        console.log(err);
        res.status(500).end();
    }

})

/* app.get('/', function (req, res) {  //endpoint, ruta
    res.sendFile(__dirname + '/views/index.html');
}); */

app.get('/usuarios', function (req, res) {  //endpoint, ruta. Siempre solo una respuesta por path.
    console.log('entre');
    Usuario.find().select(["email","name"]).then(data => {
        res.send(data);
    })
        .catch(err => {
            console.log(err);
            res.status(404).end(); // enviar error
        });


});

app.get('/usuarios/:id', function (req, res) {  //endpoint, ruta. Siempre solo una respuesta por path.
    Usuario
        .findById(req.params.id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            console.log(err);
            res.status(404).end(); // enviar error
        });
});

app.post('/usuario', function (req, res) {  //endpoint, ruta. Siempre solo una respuesta por path.
    let usuario = new Usuario()
    usuario.name = req.body.name
    usuario.save((err, usuarioAlmacenado) => {
        if (err) {
            res.status(500).send('Error')
        } else {
            res.status(200).send({usuario: usuarioAlmacenado})
        }
    })

});

app.listen(4444);

//let data = Category.find();

//console.log(data)