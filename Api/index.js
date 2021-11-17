const express = require('express') // (libreria) sirve para crear aplicaciones

const app = express() // instancia de la app
const mongoose = require('mongoose');
const cors = require('cors');

const DSN = 'mongodb://localhost:27017/IRDB'; // Data source name
const aut = require('./middlewares/aut');
const RestosCtrl = require('./controllers/restos');
const UsersCtrl = require('./controllers/users');

app.use(cors());

app.use(express.static('public')); // middleware

app.use(express.json())

app.use(async function (req, res, next) {
    try {
        await mongoose.connect(DSN, {
            serverSelectionTimeoutMS: 3000
        }); 

        mongoose.connection.on('error', err => {
            console.log(err);
            res.status(500).end();
        });

        /* mongoose.connection.on('open', err => {
        }); */
        next();

    } catch (err) {
        console.log(err);
        res.status(500).end();
    }
});

app.get('/usuarios', aut.isAuth, UsersCtrl.getUsuarios);

app.post('/login', UsersCtrl.loginUsuario);

app.post('/register', UsersCtrl.regisUsuario);

app.get('/usuarios/:id', aut.isAuth, UsersCtrl.getUsuariosId); 

app.put('/modificarUsuario', aut.isAuth, UsersCtrl.updateUsuario);

app.delete('/eliminarUsuario', aut.isAuth, UsersCtrl.deleteUsuario);



app.delete('/eliminarRestaurante', aut.isAuth, RestosCtrl.deleteRestaurant);

app.put('/modificarRestaurante', aut.isAuth, RestosCtrl.updateRestaurant);

app.get('/restaurantes', aut.isAuth, RestosCtrl.getRestaurantes);

app.get('/restaurantes/:id', aut.isAuth, RestosCtrl.getRestaurantId);

app.post('/altaRestaurante', aut.isAuth, RestosCtrl.addRestaurant);

app.listen(4444);