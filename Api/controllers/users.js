const Usuario = require('../models/usuarios'); // importamos el schema de otra carpeta
const service = require('../services/index'); //contiene la parte de crear y decodificar tokens
const bcrypt = require('bcryptjs');

function getUsuarios(req, res) {  //endpoint, ruta. Siempre solo una respuesta por path.
    Usuario.find().select(["email", "name"]).then(data => {
        res.send(data);

    })
        .catch(err => { //este catch captura errores de la db
            console.log(err);
            res.status(404).end(); // enviar error
        });
}

function getUsuariosId(req, res) {  
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
}

function regisUsuario(req, res) {
    service.decodeToken(req.body.token).then(decoded => {
        Usuario.findOne({ email: decoded.email })
            .then(data => {
                if (data == null) {
                    bcrypt.genSalt(10, function (err, salt) {
                        bcrypt.hash(decoded.password, salt).then(hash => {
                            let usuario = new Usuario({
                                name: decoded.name,
                                email: decoded.email,
                                password: hash
                            })
                            usuario.save().then(data => {
                                res.status(201).send()
                            }
                            ).catch(err => {
                                res.status(500).send(err.message)
                            })
                        }).catch(err => {
                            console.log(err.message)
                            res.end()
                        });
                    });
                } else {
                    res.status(200).send({ message: 'Ya existe un usuario con ese email' })
                }
            }).catch(err => {
                console.log(err);
                res.status(500).send();
            })
    }).catch(err => {
        console.log(err);
        res.status(500).send(err);
    });
}

function loginUsuario(req, res) {
    Usuario.findOne({ email: req.body.email }).exec().then(data => {
        if (bcrypt.compareSync(req.body.password, data.password)) { //compara la pass de la req contra la hasehada de la bd
            res.status(200).send({ token: service.createToken(data) }); //si esta ok, retorna un token
        } else {
            res.status(200).send({ message: 'usuario no encontrado' });
        };
    })
        .catch(err => {
            console.log(err);
            res.status(404).send(err.message); // enviar error
        });
}



function updateUsuario(req, res) {
    service.decodeToken(req.body.token).then(decoded => {
        //console.log(JSON.stringify(decoded));
        Usuario.findOneAndUpdate({ email: decoded.email }, { name: decoded.name }) //esto es asi porque solo queremos cambiar nombre
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
}

function deleteUsuario(req, res) { 

    service.decodeToken(req.body.token).then(decoded => { 

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
}

module.exports = {
    loginUsuario, regisUsuario, getUsuariosId, getUsuarios, updateUsuario, deleteUsuario
}