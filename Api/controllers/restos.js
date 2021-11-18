const Restaurant = require('../models/restaurantes');
const service = require('../services/index');

function addRestaurant(req, res) {
    service.decodeRestoToken(req.body.token).then(decoded => {
        Restaurant.findOne({ address: decoded.address })
            .then(data => {
                if (data === null || data == []) {
                    let nuevoResto = new Restaurant({
                        name: decoded.name,
                        address: decoded.address,
                        comments: decoded.comments,
                        dishes: decoded.dishes,
                        points: decoded.points,
                        votersList: decoded.votersList,
                        Rtype: decoded.Rtype
                    });

                    nuevoResto.save().then(data => {
                        res.status(201).send({ message: 'Restaurant creado correctamente' });

                    })
                        .catch(err => {
                            res.status(500).send(err.message);
                        })
                } else {
                    res.status(200).send({ message: 'Ya existe un restaurant con esa direccion' });

                }
            }).catch(err => {
                res.status(500).send(err.message);
            });

    })
        .catch(err => {
            res.status(500).send(err.message);
        });
}

function getRestaurantId(req, res) {
    Restaurant.findById(req.params.id)
        .then(data => {
            if (data === null) {
                return res.status(404).send({
                    message: 'restaurant inexistente'
                });
            }
            return res.send({ data });
        })
        .catch(err => {
            console.log(err);
            res.status(404).end(); // enviar error
        });
}

function getRestaurantes(req, res) {  //endpoint, ruta. Siempre solo una respuesta por path.
    Restaurant.find().then(data => {
        res.send(data);
    })
        .catch(err => { //este catch captura errores de la db
            console.log(err);
            res.status(404).end(); // enviar error
        });
}

function updateRestaurant(req, res) {
    service.decodeRestoToken(req.body.token).then(decoded => {
        Restaurant.findOneAndUpdate({ address: decoded.address }, decoded)
            .then(data => {
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
}

function deleteRestaurant(req, res) {
    service.decodeRestoToken(req.params.token).then(decoded => {
        Restaurant.findOneAndDelete({ address: decoded.address }).then(data => {
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
}

module.exports = {
    addRestaurant, getRestaurantId, getRestaurantes, updateRestaurant, deleteRestaurant
}