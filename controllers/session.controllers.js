
const {apiProductos} = require('../utils/apirFaker')

const sesionGet = async (req, res) => {
    try {
        const user = req.user.username
        //y aqui se puede ver que passport guarda los usuarios port el id
        const productosFaker  = apiProductos()
        res.render('pages/index.ejs',{user,productosFaker})

    } catch (error) {
        return res.status(500).json({
            msg: error.message,
            success: false
        })
    }
}
const sessionLogout = (req, res) => {
    const user = req.user.username
    req.session.destroy(err =>{
        if(err) return res.send(err)
        res.render('pages/logout.ejs',{user})
    })
}
//......................

module.exports = { 
    sesionGet ,
    sessionLogout
}
