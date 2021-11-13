const jwt = require('jwt-simple');

const moment = require('moment');

const config = require('../config');

function createToken(user) {

    const payload = { //el payload es la data encriptada de lo que queremos enviar o traer

        sub: user._id,
        name: user.name,
        email: user.email,
        iat: moment.unix(),  //momento en el que se creo 
        exp: moment().add(14, 'days').unix(), //fecha de expiración

    };

    return jwt.encode(payload, config.SECRET_TOKEN);

}
function decodeToken(token) { //El decoder devuelve una PROMESA
    const decoded = new Promise((resolve, reject) => {
        try {
            const payload = jwt.decode(token, config.SECRET_TOKEN);
            if (payload.exp <= moment().unix()) { //pregunta si el token ya expiró.
                reject({
                    status: 401,
                    message: 'El token ha expirado'
                });
            }
            let usuario = {
                id:payload.sub,
                name:payload.name,
                email:payload.email
            }
            //console.log(" ES ESTE "+usuario+ " <<<<<");
            //console.log(" ES POR ACA "+JSON.stringify(usuario)+ " <<<<<<<<");

            resolve(usuario);
        } catch (err) { //si el token no se puede validar, tira exception
            reject({
                status: 500,
                message: 'Invalid token'
            });
        }
    })
    return decoded;
}
module.exports = { createToken, decodeToken }