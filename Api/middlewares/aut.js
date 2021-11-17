const moment = require('moment');//librería npm para el tiempo
const services = require('../services') //import de los metodos para crear y decodificar tokens


function isAuth(req, res, next) { //este método se fija si la req TIENE un token o no, y si es valido
    if (!req.headers.authorization) {
        return res.status(403).send({ message: 'No tenes autorizacion' });
    }
    const token = req.headers.authorization.split(" ")[1]; //aca divide de la palabra "bearer"
    services.decodeToken(token)
        .then(decoded => {
            if(decoded.exp<=moment().unix() || decoded.exp === undefined){ //chequea si el token tiene expiracion, y si es asi, si ya expiro.
                return res.status(500).send({message: 'Token vencido o inexistente'});
            }
            next();
        })
        .catch(err => {
            console.log(err);
            return res.status(403).send(err);
        })
}

module.exports = {
    isAuth,
}