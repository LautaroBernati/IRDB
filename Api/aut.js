const mongoose = require('mongoose'); 

const User = require('../models/usuarios');  

const service = require('../services/index');

function signUp(req, res){ 

    const user = new User({ 

        name: req.body.name,
        email: req.body.email, 
        password: req.body.password

    }) 

    user.save().then(data => { 

        res.status(200).send({token: service.createToken(data)})
        
    }).catch(err=> { 

        //buscar o preguntar codigo de error http correcto para este escenario

        res.status(500).send({message: `Error al crear el usuario: ${err}` })

    })


}

function signIn(req, res){ 

    console.log('asd')

}

module.exports = { 

    signUp,
    signIn
    
}