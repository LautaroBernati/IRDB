const express = require('express') // framework (libreria) sirve para crear aplicaciones
const app = express() // instancia de la app
const mongoose = require('mongoose');
const Usuario = require('./models/usuarios'); // importamos el schema de otra carpeta
const cors = require('cors');
const DSN = 'mongodb://localhost:27017/IRDB'; // Data source name
const service = require('./services/index'); //contiene la parte de crear y decodificar tokens
const bcrypt = require('bcryptjs');
const aut = require('./middlewares/aut');
const RestosCtrl = require('./controllers/restos');
const Restaurant = require('./models/restaurantes');

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
});

app.get('/usuarios', aut.isAuth, function (req, res) {  //endpoint, ruta. Siempre solo una respuesta por path.
    //habria que ver si devolver un jwt o no aca
    Usuario.find().select(["email", "name"]).then(data => {
        //aca podria haber un jwt de todos los usuarios...
        res.send(data);

    })
        .catch(err => { //este catch captura errores de la db
            console.log(err);
            res.status(404).end(); // enviar error
        });
});

app.post('/login', function (req, res) {
    Usuario.findOne({ email: req.body.email }).exec().then(data => {
        //deberia haber un if que valide los datos que le llegan del user
        if (bcrypt.compareSync(req.body.password, data.password)) { //compara la pass hasheada de la req contra la bd
            res.status(200).send({ token: service.createToken(data) }); //si esta ok, retorna un token
        } else {
            res.status(200).send({ message: 'usuario no encontrado' });
        };
    })
        .catch(err => {
            console.log(err);
            res.status(404).send(err.message); // enviar error
        });
});

app.post('/register', function (req, res) {  //register  ------------------CAMBIÉ LA RUTA DE ACA, ANTERIOR: /usuarios. atte: Lautaro
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(req.body.password, salt).then(hash => {
            let usuario = new Usuario({
                name: req.body.name,
                email: req.body.email,
                password: hash
            })
            usuario.save().then(data => {
                res.status(201).send()
            }
            ).catch(err => {
                res.status(422).send(err.message)
            })
        }).catch(err => {
            console.log(err.message)
            res.end()
        });
    });
});

app.get('/usuarios/:id', aut.isAuth, function (req, res) {  //endpoint, ruta. Siempre solo una respuesta por path. lo mas cercano a lo ideal
    Usuario.findById(req.params.id)
        .then(data => {
            if (data === null) {
                return res.status(404).send({
                    message: 'usuario inexistente'
                });
            }
            return res.send({ token: service.createToken(data) });
            //return res.send({ data });
        })
        .catch(err => {
            console.log(err);
            res.status(404).end(); // enviar error
        });
}); //lo mas cercano a lo ideal

app.put('/perfil', aut.isAuth, function (req, res) {
    service.decodeToken(req.body.token).then(decoded => {
        //console.log(JSON.stringify(decoded));
        Usuario.findOneAndUpdate({ _id: decoded.id }, { name: decoded.name }) //esto es asi porque solo queremos cambiar nombre
            .then(data => {
                if (data != null) {
                    res.status(200).send({ message: 'Usuario actualizado con exito' })
                } else {
                    res.status(200).send({ message: 'No se pudo actualizar el usuario' })
                }
            }).catch(err => {
                console.log(err);
                res.status(500).send();
            })
    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
});

app.delete('/eliminarUsuario', aut.isAuth, function (req, res) { //deleteUsuario con token

    service.decodeToken(req.body.token).then(decoded => { //ian

        Usuario.findOneAndDelete({ email: decoded.email }).then(data => {
            if (data != null) {
                res.status(200).send({ message: 'Usuario borrado con exito' })
            } else {
                res.status(200).send({ message: 'No se pudo borrar el usuario' })
            }
        }).catch(err => {
            res.status(500).send(err)
        });

    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
});

app.delete('/eliminarRestaurant', aut.isAuth, function (req, res) { // deleteRestaurant con token, encontrando por nombre faltaria ver si se puede por id
    service.decodeRestoToken(req.body.token).then(decoded => { //ian
        console.log(decoded);
        Restaurant.findOneAndDelete({ _id: decoded.id }).then(data => {
            if (data != null) {
                res.status(200).send({ message: 'Restaurant borrado con exito' })
            } else {
                res.status(200).send({ message: 'No se pudo borrar el Restaurant' })
            }
        }).catch(err => {
            res.status(500).send(err)
        });

    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
});


app.put('/putResto', aut.isAuth, function (req, res) { //juan
    service.decodeRestoToken(req.body.token).then(decoded => {
        console.log("a esta altyura decodifico ok");
        console.log(decoded);
        Restaurant.findOneAndUpdate({ _id: decoded.id }, decoded)
        .then(data => {
            console.log(data)
            if (data != null) {
                res.status(200).send({ message: 'Restaurante actualizado con exito' })
            } else {
                res.status(200).send({ message: 'No se pudo actualizar el restaurante' })
            }
        }).catch(err => {
            console.log(err);
            res.status(500).send(err)
        })
    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    })   
})

//RESTAURANTE -- POR QUE EL RESTAURANTES DEVUELVE EL USUARIO EN SI PERO EN EL DE ID DEVUELVE UN TOKEN?
// EN LOS USUARIOS HABIAMOS PUESTO EL ISADMIN, AHORA NO LO VAMOS A PONER?

app.get('/restaurantes', aut.isAuth, function (req, res) {  //endpoint, ruta. Siempre solo una respuesta por path.
    Restaurant.find().select(["name", "address"]).then(data => {
        res.send(data);
    })
        .catch(err => { //este catch captura errores de la db
            console.log(err);
            res.status(404).end(); // enviar error
        });
});

app.get('/restaurantes/:id', aut.isAuth, function (req, res) {  
    Restaurant.findById(req.params.id)
        .then(data => {
            if (data === null) {
                return res.status(404).send({
                    message: 'restaurant inexistente'
                });
            }
            //return res.send({ token: service.createToken(data) }); LO CAMBIE - CAMI
            return res.send({ data });
        })
        .catch(err => {
            console.log(err);
            res.status(404).end(); // enviar error
        });
});


app.post('/altaResto', aut.isAuth, RestosCtrl.addRestaurant);

app.listen(4444);