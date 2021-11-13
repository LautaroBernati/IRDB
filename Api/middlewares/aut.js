const jwt = require('jwt-simple'); //json web token
const moment = require('moment');//librería npm para el tiempo
const config = require('../config'); //import de la llave SECRET_TOKEN
const services = require('../services') //import de los metodos para crear y decodificar tokens


function isAuth(req, res, next) { //este método se fija si la req TIENE un token o no, y si es valido (no expiró)
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No tenes autorizacion' });
    }
    const token = req.headers.authorization.split(" ")[1];
    services.decodeToken(token)
        .then(response => {
            req.user = response;
            next();
        })
        .catch(response => {
            //res.status(response.status);//hace a la diferencia esto?
            return res.status(403).send({ message: 'No se pudo validar su token' });
        })
}

module.exports = {
    isAuth,
}