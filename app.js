const express = require("express")
const app = express()
const router = require("./rutas/rutas")
//Siempre para ustilizar sessions
const session = require("express-session")
const cookieParser = require("cookie-parser")

require("dotenv").config()
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cookieParser())

//Importamos Passport 
const {passport} = require('./controllers/passport')
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

app.use(passport.initialize());
app.use(passport.session());

//Views 
app.set('view engine','ejs');
app.set('views',__dirname+'/views');
//Midleware y Rutas
app.use(express.static(__dirname+"/public"))
app.use('/session',router)



module.exports = app;