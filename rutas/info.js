const express = require("express")
const {Router} = express
const routerInfo= Router()

//Requerimos Fork
const {fork} = require("child_process")

routerInfo.get("/",(req,res)=>{

    res.json({
        "Cantidad de hilos de ejecució":require("os").cpus().length,
        "Argumentos de entrada":process.argv.slice(2),
        "Path de ejecución":process.argv[0],
        "Carpeta del Proyecto":process.argv[1],
        "Directorio actual de Trabajo":process.cwd(),
        "Id del proceso":process.pid,
        "Version de Node":process.version,
        "Título del proceso":process.title,
        "Sistema Operativo":process.platform,
        "Memoria Total Reservada":process.memoryUsage().rss
    })
})
routerInfo.get("/api/randoms",(req,res)=>{
    const cant = parseInt(req.query.cant)||100000000;
    let obj = fork("./controllers/calculo.js")
    obj.send(cant);
    obj.on("message",mensaje=>{
        res.json(mensaje)
    })
})

module.exports = {routerInfo};