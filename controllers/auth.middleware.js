
const checkAuthentication = (req,res,next)=>{
    if (!req.isAuthenticated()) {
        //La funcion isAuthenticated() (retorna un booleano) me ayuda a saber si esta con la sesion iniciada, osea este en session 
        return res.redirect('/')
    } else {
        next()
    }
}

module.exports = { 
    checkAuthentication
}
