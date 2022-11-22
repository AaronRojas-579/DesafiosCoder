const mongoose = require ("mongoose");

class MongoAltlas{
    constructor (model){
        this.model = model;
        this.connect()
    }
    connect(){
        try{
            const URL = "mongodb+srv://aaronrojas:aTS3dsE5dG8Q3nUc@cluster0.iy3iqn0.mongodb.net/usuarios";
            mongoose.connect(URL,{
                useNewUrlParser:true,
                useUnifiedTopology:true,
            })
            console.log("Database conectada")
        }catch(err){
            console.log(err)
        }
    }
    async save (nuevoObjeto){
        try{
            if(nuevoObjeto.length != undefined){
                await this.model.insertMany(nuevoObjeto)
                console.log("Nuevos Usuarios Creados")
            }else{
                const newMensaje = new this.model(nuevoObjeto);
                await newMensaje.save();
                console.log("Nuevo Usuario Creado")
            }
        }catch(err){
            console.log(err);
        }
    }
    async getAll (){
        try{
            const data = await this.model.find({});
            return data;
        }catch(err){
            console.log(err)
        }
    }
    async getById (idABuscar){
        try{
            const data = await this.model.find({_id:idABuscar});
            return data;
        }catch(err){
            console.log(err)
        }
    }
    async getByUsername (username){
        try{
            const data = await this.model.find({username:username});
            console.log(data)
            return data;
        }catch(err){
            console.log(err)
        }
    }
    async updateById (idAModificar,modificaciones){
        try{
            await this.model.updateOne({"_id":idAModificar},{$set:modificaciones})
            console.log("Usuario Modificado")
        }catch(err){
            console.log(err)
        }
    }
    async deleteById (idAEliminar){
        try{
            await this.model.deleteOne({_id:idAEliminar});
            console.log("Usuario Eliminado")
        }catch(err){
            console.log(err)
        }
    }
    async deleteAll(){
        try{
            await this.model.deleteMany({});
            console.log("Todos los Usuarios han sido eliminados")
        }catch(err){
            console.log(err)
        }
    }
}


module.exports = MongoAltlas;