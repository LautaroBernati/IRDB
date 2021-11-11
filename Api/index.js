const express = require('express') // framework (libreria) sirve para crear aplicaciones 

const app = express() // instancia de la app

const mongoose = require('mongoose');

const Usuario = require('./models/usuarios'); // importamos el schema de otra carpeta

const cors = require('cors');

const DSN = 'mongodb://localhost:27017/IRDB'; // Data source name

const service = require('./services/index');

const bcrypt = require('bcryptjs');

app.use(cors());

app.use(express.static('public')); // middleware

app.use(express.json())

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

app.get('/usuarios', function (req, res) {  //endpoint, ruta. Siempre solo una respuesta por path.
    Usuario.find().select(["email", "name"]).then(data => {
        res.send(data);
    })
        .catch(err => {
            console.log(err);
            res.status(404).end(); // enviar error
        });
});

app.post('/login', function (req, res) {  //endpoint, ruta. Siempre solo una respuesta por path.
    Usuario.findOne({email: req.body.email}).exec().then(data => {
        if(bcrypt.compareSync(req.body.password, data.password)){
            res.status(200).send({ token: service.createToken(data) });
        }else {
          res.status(404).send(err.message);
        };
        
    })
        .catch(err => {
            console.log(err);
            res.status(404).send(err.message); // enviar error
        });
});
app.get('/usuarios/:id', function (req, res) {  //endpoint, ruta. Siempre solo una respuesta por path. lo mas cercano a lo ideal
    Usuario
        .findById(req.params.id)
        .then(data => {
            res.send({ token: service.createToken(data) });
        })
        .catch(err => {
            console.log(err);
            res.status(404).end(); // enviar error
        });
}); //lo mas cercano a lo ideal

app.post('/usuarios', function (req, res) {  //endpoint, ruta. Siempre solo una respuesta por path.
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(req.body.password, salt, function(err, hash) {  
            if(err){
                console.log(err.message)
                res.end()
            }
            let usuario = new Usuario({
                name: req.body.name,
                email: req.body.email,
                password: hash
            })
            usuario.save().then(data => {
                res.status(200).send()
            }
            ).catch(err => {
                res.status(422).send(err.message)
            })
        });
    });
});

app.listen(4444);