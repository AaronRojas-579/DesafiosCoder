const express = require("express")
const {Router} = express;
const {passport} = require('../controllers/passport')

const { sesionGet, sessionLogout} = require('../controllers/session.controllers')
const {checkAuthentication } = require('../controllers/auth.middleware')


const router = Router();

router.get('/', checkAuthentication,sesionGet)
router.get('/logout', sessionLogout)
//Utilizando las configuraciones con passport
router.post('/login', passport.authenticate('login',{
    //Redireccion en caso del login correcto
    successRedirect:'./',
    //Redireccion en caso del login incorrecto
    failureRedirect: './login/error',
}))
router.post('/register',passport.authenticate('singup',{
    successRedirect:'/',
    failureRedirect:'./login/error'
}))
router.get('/login/error',(req,res)=>{
    res.render("pages/errorLogin.ejs")
} )
router.get('/register/error',(req,res)=>{
    res.render("pages/errorRegister.ejs")
} )

module.exports = {router}