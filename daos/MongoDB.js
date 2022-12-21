const mongoose = require ("mongoose");
require('dotenv').config()

const {loggerConsola,loggerWarn,loggerError} = require("../logger")

class MongoAltlas{
    constructor (model){
        this.model = model;
        this.connect()
    }
    connect(){
        try{
            const URL = process.env.MONGODB;
            mongoose.connect(URL,{
                useNewUrlParser:true,
                useUnifiedTopology:true,
            })
            loggerConsola.info("Database conectada")
        }catch(err){
            loggerError.error(err)
        }
    }
    async save (nuevoObjeto){
        try{
            if(nuevoObjeto.length != undefined){
                await this.model.insertMany(nuevoObjeto)
                loggerConsola.info("Nuevos Usuarios Creados")
            }else{
                const newMensaje = new this.model(nuevoObjeto);
                await newMensaje.save();
                loggerConsola.info("Nuevo Usuario Creado")
            }
        }catch(err){
            loggerError.error(err);
        }
    }
    async getAll (){
        try{
            const data = await this.model.find({});
            return data;
        }catch(err){
            loggerError.error(err)
        }
    }
    async getById (idABuscar){
        try{
            const data = await this.model.find({_id:idABuscar});
            return data;
        }catch(err){
            loggerError.error(err)
        }
    }
    async getByUsername (username){
        try{
            const data = await this.model.find({username:username});
            loggerConsola.info(data)
            return data;
        }catch(err){
            loggerError.error(err)
        }
    }
    async updateById (idAModificar,modificaciones){
        try{
            await this.model.updateOne({"_id":idAModificar},{$set:modificaciones})
            loggerConsola.info("Usuario Modificado")
        }catch(err){
            loggerError.error(err)
        }
    }
    async deleteById (idAEliminar){
        try{
            await this.model.deleteOne({_id:idAEliminar});
            loggerConsola.info("Usuario Eliminado")
        }catch(err){
            loggerError.error(err)
        }
    }
    async deleteAll(){
        try{
            await this.model.deleteMany({});
            loggerConsola.info("Todos los Usuarios han sido eliminados")
        }catch(err){
            loggerError.error(err)
        }
    }
}


module.exports = MongoAltlas;