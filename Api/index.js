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

app.post('/usuarios', (req, res) => {
    req.body.save((rr,usuario)=>res.status(200).send(usuario))
    

    
    //Usuario.insertMany(req.body);
    //console.log(req.body.email);

    /* if(!req.body.name || !req.body.email) {
        respuesta = {
         error: true,
         codigo: 502,
         mensaje: 'El campo name y email son requeridos'
        };
       } else {
        if(req.body.name !== '' || req.body.email !== '') {
         respuesta = {
          error: true,
          codigo: 503,
          mensaje: 'El usuario ya fue creado previamente'
         };
        } else {
            usuario = {
          name: req.body.name,
          email: req.body.email,
          password: req.body.password
         };
         respuesta = {
          error: false,
          codigo: 200,
          mensaje: 'Usuario creado',
          respuesta: usuario
         };
        }
       }
       
       res.send(respuesta); */
       
    
});    

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

app.listen(4444);

//let data = Category.find();

//console.log(data)