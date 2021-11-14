const mongoose = require('mongoose'); 

const {Schema} = mongoose; // es lo mismo que const schema = mongoose.Schema, con {} es para acceder a la propiedad de un objeto. 

const Restaurant = new Schema({
    name : { 
        type: String,
        required: true
    },
    address : {
        type: String,
        required: true
    },
    comments : {
        type: Array,
        required: false
    },
    dishes:{
        type: Array,
        required: false
    },
    points:{
        type: Number,
        required: true
    },
    votersList:{
        type: Array,
        required: true
    },
    Rtype:{
        type: String,
        required: true
    }
}, { 
    collection: 'Restaurantes'
});

/* mongoose.connection.on('error',err => { 

        console.log(err)

});
 */

module.exports = mongoose.model('Restaurantes', Restaurant); // genera un modelo internamente y toda la definicion de este modelo.