module.exports = { 

    port: process.env.PORT || 4444, 
    db: process.env.MONGODB || 'mongodb://localhost:27017/IRDB', 
    SECRET_TOKEN: 'miclavedetokens'

}