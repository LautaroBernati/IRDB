const mongoose = require('mongoose'); 

const {Schema} = mongoose; // es lo mismo que const schema = mongoose.Schema, con {} es para acceder a la propiedad de un objeto. 

const Usuario = new Schema({

    name : { 

        type: String,

        required: true
  
    } 

}, { 


    collection: 'Usuarios'

});

/* mongoose.connection.on('error',err => { 

        console.log(err)

});
 */

module.exports = mongoose.model('Usuario', Usuario); // genera un modelo internamente y toda la definicion de este modelo.