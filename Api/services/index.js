const jwt = require('jwt-simple');

const moment = require('moment');

const config = require('../config');

function createToken(user) {

    const payload = { //el payload es la data encriptada de lo que queremos enviar o traer

        sub: user._id,
        name: user.name,
        email: user.email,
        iat: moment().unix(),  //momento en el que se creo 
        exp: moment().add(7, 'days').unix(), //fecha de expiración
    };

    return jwt.encode(payload, config.SECRET_TOKEN);

}
function decodeToken(token) { //El decoder devuelve una PROMESA
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN);
            let usuario = {
                id: payload.sub,
                name: payload.name,
                email: payload.email,
                iat: payload.iat,
                exp: payload.exp
            }
            resolve(usuario);
        } catch (err) { //si el token no se puede validar, tira exception
            console.log(err);
            reject({
                status: 500,
                message: 'Invalid token'
            });
        }
    })
    return decoded;
}

function decodeRestoToken(restoToken) {
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(restoToken, config.SECRET_TOKEN);
            let resto = {
                id: payload.sub,
                name: payload.name,
                address: payload.address,
                comments: payload.comments,
                dishes: payload.dishes,
                points: payload.points,
                votersList: payload.votersList,
                Rtype: payload.Rtype
            }
            resolve(resto);
        } catch (err) { //si el token no se puede validar, tira exception
            reject({
                status: 500,
                message: 'Invalid token'
            });
        }
    });
    return decoded;
}
module.exports = { createToken, decodeToken, decodeRestoToken }