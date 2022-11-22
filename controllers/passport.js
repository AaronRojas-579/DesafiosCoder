//Passport Local
//npm install passport passport-local 
//npm install bcrypt
const passport = require('passport')
const LocalStrategy = require('passport-local')
const bCrypt = require('bcrypt')

//Importo la Base de Datos
const MongoAtlas = require('../daos/MongoDB')
const modelUsuario = require('../daos/models/usuario.model')
const usuariosMongoDB = new MongoAtlas(modelUsuario);


//--Funcion de Encriptacion
//Esta funcion agarra el password incriptado y compara
function isValidPassword(user, password) {
    return bCrypt.compareSync(password, user.password);
}
function createHash(password) {
    return bCrypt.hashSync(
              password,
              bCrypt.genSaltSync(10),//10 niveles de inscriptacion 
              null);
}
//-------------
//---Config LocalStrategy del Login

passport.use('login', new LocalStrategy(async (username, password, done) => {
    try{
        let user = (await usuariosMongoDB.getByUsername(username))[0];

        if(!user){
            //Relacionado con la funcion isAuthenticate()
            console.log(`User Not Found with username ${username}`)
            return done(null,false)
        }else if(!isValidPassword(user,password)){
            console.log(`Contraseña Incorrecta`)
            return done(null,false)
        }
        return done(null,user)
    }catch(err){
        console.log(err)
    }
    })
);

passport.use('singup',new LocalStrategy({
    passReqToCallback:true
},
async (req,username,password,done)=>{
    try{
        let user = await usuariosMongoDB.getByUsername(username);
        if(user.length !== 0){
            console.log(`User already exist`);
            return done(null,false,{message:`User already exists`})
        }
        const newUSer = {
            username,
            password:createHash(password),//Incripta el password
        }
        await usuariosMongoDB.save(newUSer)
        const nuevoUser = (await usuariosMongoDB.getByUsername(username))[0];
        return done(null,nuevoUser)
    }catch(err){
        console.log(err)
    }
}
))
//----------------
passport.serializeUser((user, done) => {
    done(null, user._id);
  });
passport.deserializeUser(async(id, done) => {
    const user = (await usuariosMongoDB.getById(id))[0]
    done(null,user)
  });

  module.exports = {passport}