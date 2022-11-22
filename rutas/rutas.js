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
    failureRedirect: '/',
}))
router.post('/register',passport.authenticate('singup',{
    successRedirect:'/',
    failureRedirect:'/'
}))


module.exports = router