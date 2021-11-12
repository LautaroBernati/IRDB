const jwt =  require('jwt-simple'); //json web token

const moment = require('moment');//librería npm para el tiempo

const config = require('../config'); //export del SECRET_TOKEN

function isAuth( req, res, next) { //este método se fija si el token es válido

    if(!req.headers.authorization){ 

        return res.status(403).send({message: 'No tenes autorizacion'})

    }

    const token = req.headers.authorization.split(" ")[1]; 
    const payload = jwt.decode(token, config.SECRET_TOKEN);


    if(payload.exp <= moment().unix()){ 

        return res.status(401).send({message: 'El token ha expirado'})

    }

    req.user = payload.sub; 

    next();

}
function tokenToObject(req, res, next){
    const token = req.body.usuario
    const payload = jwt.decode(token, config.SECRET_TOKEN);

    if(payload != null){
        return res.status(200).send({
            name: payload.name,
            password: payload.password,
            email: payload.email
        })
    }

    next()
}

module.exports = { 

    isAuth,
    tokenToObject

}