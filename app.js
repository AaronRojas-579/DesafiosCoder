const express = require("express")
const app = express()
const {router} = require("./rutas/rutas")
const {routerInfo} = require("./rutas/info")
//Siempre para ustilizar sessions
const session = require("express-session")
const cookieParser = require("cookie-parser")

require("dotenv").config()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

//Importamos Passport 
const {passport} = require('./controllers/passport')

//Requerimos los Loggers
const {loggerConsola,loggerWarn,loggerError} = require("./logger")


//Inicilizamos Passport
app.use(session({
 secret: 'keyboard cat',
 cookie: {
   httpOnly: false,
   secure: false,
   maxAge: 6800 //No me cache cuando quiero hacer el process.env (no se porque) esta en milisegundos
 },
 rolling: true,
 //Estas configuraciones son importantes para que se almacenen en session
 resave: true,
 //para reemplazar
 saveUninitialized: true
 //Guardar
//Recordar que estos datos tienen un tiempo de vida o tambien se eliminan cuando salen del navegador y cuando se aplica la funcion destroy() que esta en la ruta /logout
}));

// //Ruta no existente en el servidor 
// app.use("*",(req,res)=>{
//   loggerWarn.warn(`El usuario ingreso a una ruta inexistente`)
//   const {method} = req
//   const {path} =req._parsedOriginalUrl
//   res.send(`No existe la ruta especificada ${path} con el metodo ${method}`)
// })


app.use(passport.initialize());
app.use(passport.session());

//Views 
app.set('view engine','ejs');
app.set('views',__dirname+'/views');
//Midleware y Rutas
app.use(express.static(__dirname+"/public"))
//La comentamos porque no lo vamos a necesitar ya que el proxy lo abre 
app.use('/session',router)
app.use('/info',routerInfo)



module.exports = app;