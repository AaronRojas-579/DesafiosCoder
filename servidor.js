const express = require("express")
const app = express()
PORT  = 8080


app.listen(PORT,()=>{
    console.log(`Server listen on port ${PORT}`)
})

app.get("/",(req,res)=>{
    res.send(`Bienvenidos a mi pagina WEB`)
})