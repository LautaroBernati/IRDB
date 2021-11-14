const Resto = require('../models/restaurantes');
const tokenService = require('../services/index');

function addRestaurant(req, res) {
    tokenService.decodeRestoToken(req.body.token).then(decoded => {
        //console.log(JSON.stringify(decoded)+ " <<<<<<< MIRAR ACA ");
        let nuevoResto = new Resto({
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
                res.status(422).send(err.message);
            })
    })
        .catch(err => {
            res.status(500).send(err.message);
        });
}

module.exports = {
    addRestaurant
}