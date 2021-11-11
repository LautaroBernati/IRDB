const jwt =  require('jwt-simple'); 

const moment = require('moment');

const config = require('../config')

function createToken(user){ 

    const payload = { //el payload es la data encriptada de lo que queremos enviar o traer

        sub: user._id,
        iat: moment.unix(),  //momento en el que se creo 
        exp: moment().add(14, 'days').unix(), //fecha de expiración

    }

    return jwt.encode(payload, config.SECRET_TOKEN)

}

module.exports = {createToken}